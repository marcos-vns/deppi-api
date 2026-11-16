import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY;

const STORAGE_BUCKET_COVER = process.env.SUPABASE_BUCKET_COVER || "cover";
const STORAGE_BUCKET_DOCS = process.env.SUPABASE_BUCKET_DOCS || "docs";
const STORAGE_BUCKET_PROFILE = process.env.SUPABASE_BUCKET_PROFILE || "profile";

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export async function saveFile(filename: string, file: Express.Multer.File){
  if(!supabase){
    throw new Error("Preciso ter supabaseUrl e supabaseKey no arquivo .env");
  }

  const { error } = await supabase.storage
        .from(STORAGE_BUCKET_COVER)
        .upload(filename, file.buffer, {
          contentType: file.mimetype,
        });
  
  if (error) {
    throw new Error(`Erro ao enviar imagem: ${error.message}`);
  }

  return supabase.storage
    .from(STORAGE_BUCKET_COVER)
    .getPublicUrl(filename);
}