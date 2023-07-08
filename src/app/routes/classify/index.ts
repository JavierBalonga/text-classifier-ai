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
 *                 example: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ..."
 *               tags:
 *                 type: "array"
 *                 minItems: 1
 *                 items:
 *                   type: "object"
 *                   properties:
 *                     name:
 *                       type: "string"
 *                       example: "Lorem"
 *                     description:
 *                       type: "string"
 *                       example: "Its a example tag, dont use it"
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
classifyRouter.post("/", async (req, res) => {
  const body = z
    .object({
      text: z.string(),
      tags: z
        .array(
          z.object({
            name: z.string(),
            description: z.string(),
          })
        )
        .min(1),
    })
    .parse(req.body);

  const tags = await classify(body);

  res.json({ tags });
});

export default classifyRouter;
