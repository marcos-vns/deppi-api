import { mkdir, writeFile } from "node:fs/promises";

export async function saveFileLocally(filename: string, file: Express.Multer.File){
    await mkdir("src/storage/cover", { recursive: true });

    const filePath = `src/storage/cover/${filename}`
    await writeFile(filePath, file.buffer);

    return filePath;
}