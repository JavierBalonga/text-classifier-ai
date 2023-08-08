import { NextFunction, Request, Response, Router } from "express";
import { z } from "zod";
import authMiddleware from "../../middlewares/auth";
import { classify } from "../../controller/classify";
import { AuthRequest } from "../../../types";
import { getAuth0User, patchAuth0User } from "../../services/auth0";
import ServerError from "../../utils/ServerError";

const classifyRouter = Router();

const currentRequests: { [userId: string]: boolean } = {};

/**
 * @openapi
 * /classify:
 *   post:
 *     description: classifies a text
 *     tags: ["Classify"]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             properties:
 *               text:
 *                 type: "string"
 *                 example: "javascript it's a programming language"
 *               tags:
 *                 type: "array"
 *                 example: [{"name": "javascript"},{"name": "dogs"}]
 *                 minItems: 1
 *                 items:
 *                   type: "object"
 *                   properties:
 *                     name:
 *                       type: "string"
 *                     description:
 *                       type: "string"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 tags:
 *                   type: "array"
 *                   items:
 *                     type: "string"
 */
classifyRouter.post(
  "/",
  authMiddleware(),
  async (req: Request, res: Response, next: NextFunction) => {
    const auth = (req as unknown as AuthRequest).auth;
    const userId = auth?.payload.sub;
    if (!userId) {
      return next(new ServerError({ status: 401, message: "Unauthorized" }));
    }
    if (currentRequests[userId]) {
      return next(
        new ServerError({
          status: 400,
          message: "You already have a request in progress",
        })
      );
    }
    currentRequests[userId] = true;

    let theCreditWasConsumed = false;
    let userCredits = 0;
    try {
      const body = z
        .object({
          text: z
            .string()
            .min(5, {
              message: "the 'text' must have at least '5' characters",
            })
            .max(250, {
              message: "the 'text' must not exceed '250' characters",
            }),
          tags: z
            .array(
              z.object({
                name: z
                  .string()
                  .max(25, {
                    message: "the 'name' must not exceed '25' characters",
                  })
                  .refine((name) => !name.includes(","), {
                    message: "Tags names cannot contain ','",
                  }),
                description: z
                  .string()
                  .max(150, {
                    message:
                      "the 'description' must not exceed '150' characters",
                  })
                  .optional(),
              })
            )
            .min(1, {
              message: "the 'tags' must have at least '1' tag",
            })
            .max(15, {
              message: "the 'tags' must not exceed '15' tags",
            }),
        })
        .parse(req.body);

      const auth0User = await getAuth0User(userId);
      userCredits = auth0User.app_metadata.credits || 0;
      if (userCredits < 1) {
        return next(
          new ServerError({
            status: 402,
            message: "You don't have enough credits",
          })
        );
      }
      await patchAuth0User(userId, {
        app_metadata: { credits: userCredits - 1 },
      });
      theCreditWasConsumed = true;

      res.json(await classify(body));
    } catch (error) {
      next(error);
      if (theCreditWasConsumed) {
        await patchAuth0User(userId, {
          app_metadata: { credits: userCredits },
        });
      }
    } finally {
      currentRequests[userId] = false;
    }
  }
);

export default classifyRouter;
