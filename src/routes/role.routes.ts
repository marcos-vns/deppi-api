import { Router } from "express";

import { RoleController } from "@/controllers/RoleController";
import { permissionMiddleware } from "@/middlewares/permission.middleware";
import { AuthMiddleware } from "@/middlewares/authMiddleware";

const router = Router();
const controller = new RoleController();

router.use(AuthMiddleware);
router.post("/roles", permissionMiddleware("MANAGE_ROLES"), controller.create);
router.get("/roles", permissionMiddleware("MANAGE_ROLES"), controller.list);
router.post("/roles/:roleId/permissions/:permissionId", permissionMiddleware("MANAGE_ROLES"), controller.addPermission);
router.post("/users/:userId/roles/:roleId", permissionMiddleware("MANAGE_USERS"), controller.assignRole);

export { router as roleRouter };


