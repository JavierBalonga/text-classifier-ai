import { Router } from "express";
import { z } from "zod";
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
classifyRouter.post("/", async (req, res, next) => {
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

    const tags = await classify(body);
    res.json({ tags });
  } catch (error) {
    next(error);
  }
});

export default classifyRouter;
