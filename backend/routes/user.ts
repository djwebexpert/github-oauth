import { Router } from 'express';

import { getUser, deleteUser } from "../controllers/user.controller";

const UserRouter = Router();

UserRouter.get("/:id", (req, res) => getUser(req, res));
UserRouter.delete("/:id", (req, res) => deleteUser(req, res));

module.exports = UserRouter;
