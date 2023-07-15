import * as yup from "yup";

export const envSchema = yup.object().shape({
  VITE_APP_AUTH0_DOMAIN: yup.string().required(),
  VITE_APP_AUTH0_CLIENT_ID: yup.string().required(),
  VITE_APP_AUTH0_AUDIENCE: yup.string().required(),
});

const env = envSchema.cast(import.meta.env);

export default env;
