import { Router } from "express";
import { AuthMiddleware } from "../middlewares/authMiddleware";
import { permissionMiddleware } from "../middlewares/permission.middleware";
import { validate } from "../middlewares/validate.middleware";
import { enrollSchema, updateEnrollmentStatusSchema, approveRejectSchema } from "../schemas/enrollment.schema";
import {
  enroll,
  updateStatus,
  listMyEnrollments,
  listCourseEnrollments,
  listHistory,
  approveEnrollment,
  rejectEnrollment,
  cancelEnrollment,
  getEnrollmentsByStatusReport,
} from "../controllers/EnrollmentController";

const router = Router();
router.use(AuthMiddleware);

router.post("/", validate(enrollSchema), enroll);
router.get("/me", listMyEnrollments);
router.patch("/:enrollmentId/status", validate(updateEnrollmentStatusSchema), updateStatus);
router.get("/:enrollmentId/history", listHistory);
router.get("/course/:courseId", permissionMiddleware("MANAGE_ENROLLMENT"), listCourseEnrollments);
router.get("/enrollment/status", permissionMiddleware("DEPPI_ROLES"), getEnrollmentsByStatusReport);

router.patch(
  "/:enrollmentId/approve",
  permissionMiddleware("enrollment.approve"),
  validate(approveRejectSchema),
  approveEnrollment
);
router.patch(
  "/:enrollmentId/reject",
  permissionMiddleware("enrollment.reject"),
  validate(approveRejectSchema),
  rejectEnrollment
);
router.patch(
  "/:enrollmentId/cancel",
  permissionMiddleware("enrollment.cancel"),
  validate(approveRejectSchema),
  cancelEnrollment
);

export default router;