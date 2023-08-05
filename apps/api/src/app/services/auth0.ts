import axios from "axios";
import env from "../../env";

interface AccessToken {
  token_type: "Bearer";
  expires_in: number;
  access_token: string;
  scope: string;
}

let accessToken: AccessToken | null = null;
let expirationDate: Date | null = null;

async function getAccessToken() {
  if (
    accessToken &&
    expirationDate &&
    expirationDate.valueOf() > new Date().valueOf()
  ) {
    return accessToken;
  }
  const res = await axios.post<AccessToken>(
    `https://${env.AUTH0_TENANT_NAME}.us.auth0.com/oauth/token`,
    {
      client_id: env.AUTH0_CLIENT_ID,
      client_secret: env.AUTH0_CLIENT_SECRET,
      audience: `https://${env.AUTH0_TENANT_NAME}.us.auth0.com/api/v2/`,
      grant_type: "client_credentials",
    }
  );
  accessToken = res.data;
  expirationDate = new Date(Date.now() + res.data.expires_in * 1000);
  return accessToken;
}

interface Auth0User {
  created_at: string;
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  identities: [
    {
      provider: string;
      user_id: string;
      connection: string;
      isSocial: boolean;
    },
  ];
  locale: string;
  name: string;
  nickname: string;
  picture: string;
  updated_at: string;
  user_id: string;
  last_ip: string;
  last_login: string;
  logins_count: number;
  user_metadata: Record<string, unknown>;
  app_metadata: Record<string, unknown>;
}

export async function getAuth0User(userId: string) {
  const accessToken = await getAccessToken();
  const res = await axios.get<Auth0User>(
    `https://${env.AUTH0_TENANT_NAME}.us.auth0.com/api/v2/users/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken?.access_token}`,
      },
    }
  );
  return res.data;
}

interface PatchAuth0UserPayload {
  app_metadata: Record<string, unknown>;
}

export async function patchAuth0User(
  userId: string,
  payload: PatchAuth0UserPayload
) {
  const accessToken = await getAccessToken();
  const res = await axios.patch<Auth0User>(
    `https://${env.AUTH0_TENANT_NAME}.us.auth0.com/api/v2/users/${userId}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${accessToken?.access_token}`,
      },
    }
  );
  return res.data;
}
