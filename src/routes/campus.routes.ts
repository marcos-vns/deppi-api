import { AuthMiddleware } from "@/middlewares/authMiddleware";
import { permissionMiddleware } from "@/middlewares/permission.middleware";
import { validate } from "@/middlewares/validate.middleware";
import { CampusController } from "@/controllers/CampusController";
import { createCampusSchema, updateCampusSchema } from "@/schemas/campus.schema";
import { Router } from "express";

const campusRoutes = Router();

const campusController = new CampusController();

campusRoutes.post("/campus", AuthMiddleware, permissionMiddleware("MANAGE_ROLES"), validate(createCampusSchema), campusController.create);

campusRoutes.put("/campus/:id", AuthMiddleware, permissionMiddleware("MANAGE_ROLES"), validate(updateCampusSchema), campusController.update);

campusRoutes.delete("/campus/:id", AuthMiddleware, permissionMiddleware("MANAGE_ROLES"), campusController.delete);

campusRoutes.patch("/campus/enable/:id", AuthMiddleware, permissionMiddleware("MANAGE_ROLES"), campusController.enableCampus);

campusRoutes.patch("/campus/disable/:id", AuthMiddleware, permissionMiddleware("MANAGE_ROLES"), campusController.disableCampus);

campusRoutes.get("/campus/:id", AuthMiddleware, permissionMiddleware("MANAGE_ROLES"), campusController.findById);

campusRoutes.get("/campus", AuthMiddleware, permissionMiddleware("MANAGE_ROLES"), campusController.list);

export { campusRoutes };