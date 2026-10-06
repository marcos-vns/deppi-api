import { StudentControler } from "@/controllers/StudentController";
import { AuthMiddleware } from "@/middlewares/authMiddleware";
import { permissionMiddleware } from "@/middlewares/permission.middleware";
import { validate } from "@/middlewares/validate.middleware";
import { updateStudentSchema } from "@/schemas/registerstudent.schema";
import { Router } from "express";

const studentRoutes = Router();

const studentController = new StudentControler();

studentRoutes.put("/students/:id", AuthMiddleware, permissionMiddleware("MANAGE_ROLES"), validate(updateStudentSchema), studentController.update);

studentRoutes.delete("/students/:id", AuthMiddleware, permissionMiddleware("MANAGE_ROLES"), studentController.delete);

studentRoutes.get("/students/:id", AuthMiddleware, permissionMiddleware("MANAGE_ROLES"), studentController.findById);

studentRoutes.get("/students", AuthMiddleware, permissionMiddleware("MANAGE_ROLES"), studentController.list);

export { studentRoutes };