import { NextFunction, Request, Response, Router } from "express";
import { z } from "zod";
import authMiddleware from "../../middlewares/auth";
import { classify } from "../../controller/classify";

const classifyRouter = Router();

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
  authMiddleware("run:classify"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = z
        .object({
          text: z.string(),
          tags: z
            .array(
              z.object({
                name: z.string().refine((name) => !name.includes(","), {
                  message: "Tags names cannot contain ','",
                }),
                description: z.string().optional(),
              })
            )
            .min(1),
        })
        .parse(req.body);

      // res.json(
      //   body.tags.map((tag) => ({
      //     name: tag.name,
      //     confidence: Math.floor(Math.random() * 100),
      //   }))
      // );

      res.json(await classify(body));
    } catch (error) {
      next(error);
    }
  }
);

export default classifyRouter;
