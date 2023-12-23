import { Router } from "express";

const router = Router();

router.get("/ping", (_req, res) => {
    res.send("Pong");
});

export default router;