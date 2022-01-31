import { Router } from "express";
import { CreateUserController } from "../controllers/CreateUserController";
import { CreateTagController } from "../controllers/CreateTagController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { AuthenticateUserController } from "../controllers/AuthenticateUserController";
import { CreateComplimentController } from "../controllers/CreateComplimentController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const complimentController = new CreateComplimentController();

router.post("/tags", ensureAdmin, createTagController.handle);
router.post("/users", createUserController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/compliment", complimentController.handle)

export {router};