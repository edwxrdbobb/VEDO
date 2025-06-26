"use server"

import { createServerClient } from "@/lib/supabase"

export async function uploadDocument(file: File, creatorId: string, documentType: string) {
  const supabase = createServerClient()

  try {
    // Generate unique filename
    const fileExt = file.name.split(".").pop()
    const fileName = `${creatorId}/${documentType}_${Date.now()}.${fileExt}`

    // Upload file to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage.from("documents").upload(fileName, file)

    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`)
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("documents").getPublicUrl(fileName)

    // Save document record
    const { data: docData, error: docError } = await supabase
      .from("verification_documents")
      .insert({
        creator_id: creatorId,
        document_type: documentType,
        document_url: publicUrl,
        file_name: file.name,
        file_size: file.size,
        mime_type: file.type,
        verification_status: "pending",
      })
      .select()
      .single()

    if (docError) {
      throw new Error(`Database error: ${docError.message}`)
    }

    return {
      success: true,
      documentId: docData.id,
      url: publicUrl,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Upload failed",
    }
  }
}

export async function getCreatorDocuments(creatorId: string) {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("verification_documents")
    .select("*")
    .eq("creator_id", creatorId)
    .order("uploaded_at", { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch documents: ${error.message}`)
  }

  return data
}
