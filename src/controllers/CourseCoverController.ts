import { CourseCoverService } from "@/services/CourseCoverService";
import { showCoverRequest, uploadCoverRequest } from "@/model/CourseCoverRequest";
import { Request, Response } from "express";

export class CourseCoverController {
  async upload(req: Request, res: Response) {
    try{
      const coverService = new CourseCoverService();

      console.log(req.params);

      const coverImage: uploadCoverRequest = {
        courseId: String(req.params.id),
        file: req.file
      }

      const result = await coverService.upload(coverImage);

      return res.status(201).json(result);
    } catch (e: any) {
      return res.status(400).json({ error: e.message });
  }
  }

  async show(req: Request, res: Response) {
    const service = new CourseCoverService();

    const coverImage: showCoverRequest = {
      courseId: String(req.params.id),
    }

    const result = await service.show(coverImage);

    return res.status(200).json(result);
  }
}