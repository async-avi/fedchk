import { uploadImageToCloud } from "@/app/lib/uploadImageToCloud";
import React, { useState } from "react";
import { CiCamera } from "react-icons/ci";

function TextAndMedia() {
  const [content, setContent]: any = useState([]);
  return (
    <form>
      <div className="p-24 border-2 border-dashed w-fit rounded-lg bg-blue-100 border-blue-900">
        <input
          type="file"
          name="mediaInput"
          accept="image/*, video/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={(e) => {
            let file = e.target.files![0];
            if (file.type.includes("image") && file.size <= 1048576) {
              const reader = new FileReader();
              reader.onload = function () {
                const base64String = reader.result;
                uploadImageToCloud(base64String as string);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
        <label className="text-gray-500 text-sm font-medium pointer-events-none text-center flex flex-col gap-1 items-center">
          <CiCamera size={25} />
          <span>Click to upload media</span>
        </label>
      </div>
      <div className="flex gap-2 h-fit p-2">
        {content.map((url: any) => {
          return <img key={url} src={url} className="w-1/6" />;
        })}
      </div>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default TextAndMedia;
