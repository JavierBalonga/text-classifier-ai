import { Response, NextFunction } from "express";
import ServerError from "../utils/ServerError";
import env from "../../env";
import { AuthRequest } from "../../types";

const { auth } = require("express-oauth2-jwt-bearer");

const { AUTH0_AUDIENCE, AUTH0_ISSUER_BASE_URL } = env;

const jwtCheck = auth({
  audience: AUTH0_AUDIENCE,
  issuerBaseURL: AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

export default function authMiddleware(requiredScope?: string) {
  const middlewares = [jwtCheck];

  if (requiredScope) {
    middlewares.push((req: AuthRequest, res: Response, next: NextFunction) => {
      const scopes = req.auth?.payload.scope.split(" ");
      const hasScope = scopes?.includes(requiredScope);

      if (!hasScope) {
        next(
          new ServerError({
            message:
              "You don't have the required scope to access this resource",
            status: 401,
          })
        );
      }

      next();
    });
  }

  return middlewares;
}
