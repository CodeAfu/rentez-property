import api from "./api";

interface UploadUrlResponse {
  uploadUrl: string;
  key: string;
  bucket: string;
}

interface ConfirmUploadResponse {
  imageUrl: string;
  key: string;
}

/**
 * Uploads an image file to S3 and returns the public URL
 * @param file - The image file to upload
 * @returns The S3 URL of the uploaded image
 */
export async function uploadImageToS3(file: File): Promise<string> {
  try {
    // Step 1: Get pre-signed upload URL from backend
    const { data: uploadData } = await api.post<UploadUrlResponse>(
      "/api/Upload/get-upload-url",
      {
        fileName: file.name,
        contentType: file.type,
      }
    );

    // Step 2: Upload file directly to S3 using pre-signed URL
    // Note: Don't set Content-Type header here as it's already in the pre-signed URL
    const uploadResponse = await fetch(uploadData.uploadUrl, {
      method: "PUT",
      body: file,
    });

    if (!uploadResponse.ok) {
      throw new Error(`S3 upload failed: ${uploadResponse.statusText}`);
    }

    // Step 3: Confirm upload with backend and get final URL
    const { data: confirmData } = await api.post<ConfirmUploadResponse>(
      "/api/Upload/confirm-upload",
      {
        key: uploadData.key,
      }
    );

    return confirmData.imageUrl;
  } catch (error) {
    console.error("Image upload error:", error);
    throw error;
  }
}

/**
 * Uploads multiple images to S3 and returns their URLs
 * @param files - Array of image files to upload
 * @returns Array of S3 URLs
 */
export async function uploadMultipleImagesToS3(
  files: File[]
): Promise<string[]> {
  const uploadPromises = files.map((file) => uploadImageToS3(file));
  return Promise.all(uploadPromises);
}
