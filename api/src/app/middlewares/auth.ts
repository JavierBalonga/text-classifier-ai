import { Request, Response, NextFunction } from "express";
import ServerError from "../utils/ServerError";
import env from "../../env";

const { auth } = require("express-oauth2-jwt-bearer");

const { AUTH0_AUDIENCE, AUTH0_ISSUER_BASE_URL } = env;

const jwtCheck = auth({
  audience: AUTH0_AUDIENCE,
  issuerBaseURL: AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

export interface AuthObject {
  payload: {
    iss: string;
    sub: string;
    aud: string[];
    iat: number;
    exp: number;
    azp: string;
    scope: string;
  };
  header: {
    alg: string;
    typ: string;
    kid: string;
  };
  token: string;
}

export default function authMiddleware(requiredScope?: string) {
  const middlewares = [jwtCheck];

  if (requiredScope) {
    middlewares.push(
      (
        req: Request & { auth: AuthObject },
        res: Response,
        next: NextFunction
      ) => {
        req.auth;
        const scopes = req.auth.payload.scope.split(" ");
        const hasScope = scopes.includes(requiredScope);

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
      }
    );
  }

  return middlewares;
}
