import { UserController } from "@/controllers/UserController";
import { AuthMiddleware } from "@/middlewares/authMiddleware";
import { permissionMiddleware } from "@/middlewares/permission.middleware";
import { validate } from "@/middlewares/validate.middleware";
import { updateUserSchema } from "@/schemas/user.schema";
import { Router } from "express";

const userRoutes = Router();

const userController = new UserController();

userRoutes.put("/users/:id", AuthMiddleware, permissionMiddleware("DEPPI_ROLES"), validate(updateUserSchema), userController.update);

userRoutes.delete("/users/:id", AuthMiddleware, permissionMiddleware("DEPPI_ROLES"), userController.delete);

userRoutes.get("/users/:id", AuthMiddleware, permissionMiddleware("DEPPI_ROLES"), userController.findById);

userRoutes.get("/users", AuthMiddleware, permissionMiddleware("DEPPI_ROLES"), userController.list);

export { userRoutes };