import { CivilServantController } from "@/controllers/CivilServantController";
import { AuthMiddleware } from "@/middlewares/authMiddleware";
import { permissionMiddleware } from "@/middlewares/permission.middleware";
import { validate } from "@/middlewares/validate.middleware";
import { updateCivilServantSchema } from "@/schemas/registercivilservant";
import { Router } from "express";

const civilServantRoutes = Router();

const civilServantController = new CivilServantController();

civilServantRoutes.put("/servidores/:id", AuthMiddleware, permissionMiddleware("DEPPI_ROLES"), validate(updateCivilServantSchema), civilServantController.update);

civilServantRoutes.delete("/servidores/:id", AuthMiddleware, permissionMiddleware("DEPPI_ROLES"), civilServantController.delete);

civilServantRoutes.patch("/servidores/disable/:id", AuthMiddleware, permissionMiddleware("DEPPI_ROLES"), civilServantController.disableCivilServant);

civilServantRoutes.patch("/servidores/enable/:id", AuthMiddleware, permissionMiddleware("DEPPI_ROLES"), civilServantController.enableCivilServant);

civilServantRoutes.get("/servidores/:id", AuthMiddleware, permissionMiddleware("DEPPI_ROLES"), civilServantController.findById);

civilServantRoutes.get("/servidores", AuthMiddleware, permissionMiddleware("DEPPI_ROLES"), civilServantController.list);

export { civilServantRoutes };