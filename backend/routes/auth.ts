import { Router } from "express";

import { gitAuth } from "../controllers/auth.controller";

const AuthRouter = Router();
AuthRouter.get("/", (req, res) => gitAuth(req, res));

module.exports = AuthRouter;
