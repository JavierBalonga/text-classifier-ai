import { Router } from "express";
import rootRouter from "./root";
import classifyRouter from "./classify";
import creditsRouter from "./credits";

const router = Router();

router.use("/", rootRouter);
router.use("/classify", classifyRouter);
router.use("/credits", creditsRouter);

export default router;
