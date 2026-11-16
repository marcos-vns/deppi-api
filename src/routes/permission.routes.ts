import { Router } from "express";
import { PermissionController } from "../controllers/PermissionController";
import { permissionMiddleware } from "@/middlewares/permission.middleware";
import { AuthMiddleware } from "@/middlewares/authMiddleware";

const router = Router();

const controller = new PermissionController();

router.use(AuthMiddleware);
router.post("/permissions", permissionMiddleware("MANAGE_PERMISSIONS"), controller.create);

router.get("/permissions", permissionMiddleware("VIEW_PERMISSIONS"), controller.list);

export { router as permissionRouter };

