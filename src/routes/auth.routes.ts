import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { AuthMiddleware } from "../middlewares/authMiddleware";
import { permissionMiddleware } from "@/middlewares/permission.middleware";
import { validate } from "@/middlewares/validate.middleware";
import { registerStudentSchema } from "@/schemas/registerstudent.schema";
import { registerCivilServantSchema } from "@/schemas/registercivilservant";
import { PasswordRecoveryController } from "@/controllers/PasswordRecoveryController";
import { PasswordRecoveryService } from "@/services/PasswordRecoveryService";
import { SmtpEmailService } from "@/services/SmtpEmailService";

const authRoutes = Router();
const authController = new AuthController();
const emailService = new SmtpEmailService();
const passwordRecoveryService = new PasswordRecoveryService(emailService);
const passwordRecoveryController = new PasswordRecoveryController(
    passwordRecoveryService
);

authRoutes.post(
  "/register",
  validate(registerStudentSchema),
  authController.registerStudent
);

authRoutes.post(
  "/admin/servidores",
  AuthMiddleware,
  permissionMiddleware("MANAGE_ROLES"),
  validate(registerCivilServantSchema),
  (request, response) => authController.registerCivilServant(request, response, "DEPPI")
);

authRoutes.post(
  "/deppi/servidores",
  AuthMiddleware,
  permissionMiddleware("DEPPI_ROLES"),
  validate(registerCivilServantSchema),
  (request, response) => authController.registerCivilServant(request, response, "PROFESSOR")
);

authRoutes.post("/login", authController.login);

authRoutes.get("/me", AuthMiddleware, authController.me);

authRoutes.post(
    "/forgot-password",
    passwordRecoveryController.forgotPassword.bind(passwordRecoveryController)
);

authRoutes.post(
    "/reset-password",
    passwordRecoveryController.resetPassword.bind(passwordRecoveryController)
);

export { authRoutes };