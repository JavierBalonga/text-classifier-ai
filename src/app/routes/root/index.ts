import { Router } from "express";

const rootRouter = Router();

/**
 * @openapi
 * /:
 *   get:
 *     description: Health check endpoint
 *     tags: ["Root"]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 status:
 *                   type: "string"
 *                   enum: ["ok"]
 */
rootRouter.get("/", (_req, res) => {
  res.json({ status: "ok" });
});

export default rootRouter;
