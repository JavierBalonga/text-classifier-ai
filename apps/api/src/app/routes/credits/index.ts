import { NextFunction, Request, Response, Router } from "express";
import ServerError from "../../utils/ServerError";
import { getAuth0User, patchAuth0User } from "../../services/auth0";
import authMiddleware from "../../middlewares/auth";
import { AuthRequest } from "../../../types";

const creditsRouter = Router();

/**
 * @openapi
 * credits/:
 *   get:
 *     description: Get the number of current credits
 *     tags: ["Credits"]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               required:
 *                 - credits
 *               properties:
 *                 credits:
 *                   type: "number"
 *                 lastClaimDatetime:
 *                   type: "string"
 */
creditsRouter.get(
  "/",
  authMiddleware(),
  async (req: Request, res: Response, next: NextFunction) => {
    const auth = (req as unknown as AuthRequest).auth;
    const userId = auth?.payload.sub;
    if (!userId)
      return next(new ServerError({ status: 401, message: "Unauthorized" }));
    const auth0User = await getAuth0User(userId);
    const { credits = 0, last_claim_datetime } = auth0User?.app_metadata;
    res.json({ credits, lastClaimDatetime: last_claim_datetime });
  }
);

/**
 * @openapi
 * credits/:
 *   post:
 *     description: claim daily credits
 *     tags: ["Credits"]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               required:
 *                 - credits
 *               properties:
 *                 credits:
 *                   type: "number"
 *                 lastClaimDatetime:
 *                   type: "string"
 */
creditsRouter.get(
  "/",
  authMiddleware(),
  async (req: Request, res: Response, next: NextFunction) => {
    const auth = (req as unknown as AuthRequest).auth;
    const userId = auth?.payload.sub;
    if (!userId) {
      return next(new ServerError({ status: 401, message: "Unauthorized" }));
    }
    const auth0User = await getAuth0User(userId);
    const { credits = 0, last_claim_datetime } = auth0User?.app_metadata;
    if (
      last_claim_datetime &&
      new Date(last_claim_datetime).getFullYear() >= new Date().getFullYear() &&
      new Date(last_claim_datetime).getMonth() >= new Date().getMonth() &&
      new Date(last_claim_datetime).getDate() >= new Date().getDate()
    ) {
      return next(new ServerError({ status: 400, message: "Already claimed" }));
    }
    const newCredits = Math.min(credits + 5, 30);
    const newClaimDatetime = new Date().toISOString();
    await patchAuth0User(userId, {
      app_metadata: {
        credits: newCredits,
        last_claim_datetime: newClaimDatetime,
      },
    });
    res.json({ credits: newCredits, lastClaimDatetime: newClaimDatetime });
  }
);

export default creditsRouter;
