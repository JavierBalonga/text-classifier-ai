import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { ReactNode } from "react";
import env from "../../env";

const {
  VITE_APP_AUTH0_DOMAIN,
  VITE_APP_AUTH0_CLIENT_ID,
  VITE_APP_AUTH0_AUDIENCE,
} = env;

export interface AuthProviderProps {
  children?: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  return (
    <Auth0Provider
      domain={VITE_APP_AUTH0_DOMAIN}
      clientId={VITE_APP_AUTH0_CLIENT_ID}
      cacheLocation="localstorage"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: VITE_APP_AUTH0_AUDIENCE,
        scope: "run:classify",
      }}
    >
      {children}
    </Auth0Provider>
  );
}

export const useAuth = () => useAuth0();
