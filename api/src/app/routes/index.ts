import { Router } from "express";
import rootRouter from "./root";
import classifyRouter from "./classify";

const router = Router();

router.use("/", rootRouter);
router.use("/classify", classifyRouter);

export default router;
