import { Router } from 'express';

import { getUser, deleteUser, getOrgsData, getRepoDetail } from "../controllers/user.controller";

const UserRouter = Router();

UserRouter.get("/:id", (req, res) => getUser(req, res));
UserRouter.delete("/:id", (req, res) => deleteUser(req, res));
UserRouter.get("/:username/orgs", (req, res) => getOrgsData(req, res));
UserRouter.post("/repoDetail", (req, res) => getRepoDetail(req, res));

module.exports = UserRouter;
