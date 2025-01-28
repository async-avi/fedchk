"use server";
import asyncHandler from "@/handlers/asyncHandler";
import axios from "axios";

export async function uploadImageToCloud(base64: string) {
  try {
    const cleanBase64 = base64.replace(/^data:image\/\w+;base64,/, "");
    // Create a FormData object to handle the payload properly
    const formData = new FormData();
    formData.append("image", cleanBase64);

    // Send the POST request
    const resp = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_KEY}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Log the response data
    const data = resp.data;
    let response = {
      id: data.data.id,
      url: data.data.url,
    };
    console.log(response);
    return asyncHandler(200, response);
  } catch (error) {
    console.error("Error uploading image to Cloud:", error);
    throw error; // Optional: Re-throw the error for further handling
  }
}
