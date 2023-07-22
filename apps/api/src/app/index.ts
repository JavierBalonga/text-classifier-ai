import express from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import router from "./routes";
import openapiSpecification from "./swagger";
import errorHandler from "./error-handler";

const app = express();

app.use(express.json());
app.use(cors());
app.use(
  morgan("tiny", {
    skip(req, _res) {
      return req.baseUrl === "/doc";
    },
  })
);

app.use("/doc", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use("/", router);

app.use(errorHandler);

export default app;
