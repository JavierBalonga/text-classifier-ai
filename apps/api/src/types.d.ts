export interface AuthRequest extends Request {
  auth?: {
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
  };
}
