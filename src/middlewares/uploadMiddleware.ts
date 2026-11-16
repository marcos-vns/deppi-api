import multer from "multer";

export const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1000 * 1000,
  },

  fileFilter(req, file, callback) {
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

    if (!allowedTypes.includes(file.mimetype)) {
      return callback(new Error("Permitido apenas imagens em png e jpeg/jpg"));
    }

    callback(null, true);
  },
});
