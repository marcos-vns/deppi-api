import crypto from "crypto";
import path from "path";
import { prisma } from "@/prisma/client";
import { saveFile } from "../lib/supabase";
import { showCoverRequest, uploadCoverRequest } from "@/model/CourseCoverRequest";
import { saveFileLocally } from "../lib/localStorage";

export class CourseCoverService {
  async show({ courseId }: showCoverRequest) {
    const course = await prisma.course.findFirst({
      where: {
        id: courseId
      },
      include: {
        coverImage: true,
      },
    });

    if (!course) {
      throw new Error("Curso não encontrado");
    }

    if (!course.coverImage) {
      throw new Error("Imagem não encontrada");
    }

    return {
      url: course.coverImage.path,
      originalName: course.coverImage.originalName,
      mimeType: course.coverImage.mimeType,
      size: course.coverImage.size,
    };
  }
  
  async upload({ courseId, file }: uploadCoverRequest) {

    if (!file) {
      throw new Error("Arquivo obrigatório");
    }

    const course = await prisma.course.findFirst({
      where: {
        id: courseId
      },
    });

    if (!course) {
      throw new Error("Curso não encontrada");
    }

    const hash = crypto.randomBytes(10).toString("hex");
    const extension = path.extname(file.originalname).toLowerCase();
    const filename = `${hash}${extension}`;

    let filePath: string; 

    if(process.env.APP_ENV === "production"){
      const { data } = await saveFile(filename, file);
      filePath = data.publicUrl;
    } else {
      filePath = await saveFileLocally(filename, file);
    }

    const uploadedFile = await prisma.file.create({
      data: {
        filename: filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        path: filePath,
      },
    });

    await prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        coverImage: {
          connect: { id: uploadedFile.id },
        },
      },
    });

    return uploadedFile;
  }
}