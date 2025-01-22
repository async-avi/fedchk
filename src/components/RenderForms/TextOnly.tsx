"use client";

import React, { useState } from "react";
import axios from "axios";

interface Props {
  user?: string;
}

function TextOnly({ user }: Props) {
  const [review, setReview] = useState({
    username: user || "Anonymous",
    content: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // return (
  //   <div className="font-roboto">
  //     <form
  //       className="flex flex-col gap-2 p-2"
  //       onSubmit={async (e) => {
  //         e.preventDefault();
  //         setLoading(true);
  //         console.log(review);
  //         const resp = await axios.post(
  //           "/api/review/new/678536376cfa19fed5b6d3dd?r=false&f=1",
  //           review
  //         );
  //         const data = await resp.data;
  //         if (data.status != 200) {
  //           setLoading(false);
  //           setError(true);
  //         } else {
  //           setLoading(false);
  //           setSuccess(true);
  //         }
  //       }}
  //     >
  //       <h1 className="text-sm pl-1 font-semibold">
  //         Share your thoughts as {user ? user : "USERNAME HERE"}
  //       </h1>
  //       <textarea
  //         className="border border-black rounded-xl p-2 h-auto w-full overflow-hidden"
  //         placeholder="Type your text here..."
  //         wrap="soft"
  //         onChange={(e) => {
  //           const textarea = e.target;
  //           textarea.style.height = "auto";
  //           // Adjust height based on scroll height
  //           textarea.style.height = `${textarea.scrollHeight}px`;
  //           setReview({ ...review, content: e.target.value });
  //         }}
  //       ></textarea>

  //       <button
  //         type="submit"
  //         className="bg-gray-700 text-white border-black p-2 rounded-xl border-2"
  //       >
  //         Submit
  //       </button>
  //     </form>
  //     {loading ? (
  //       <h1>Loading</h1>
  //     ) : success ? (
  //       <h1>Success</h1>
  //     ) : error ? (
  //       <h1>Error</h1>
  //     ) : null}
  //   </div>
  // );
  return (
    <div className="flex flex-col max-w-md mx-auto p-4 space-y-4 rounded-lg shadow-sm bg-white">
      {/* Form Label */}
      <label className="text-lg font-medium text-gray-700">
        Share your thoughts as{" "}
        <span className="font-semibold text-gray-800">USERNAME HERE</span>
      </label>

      {/* Textarea */}
      <textarea
        placeholder="Type your text here..."
        className="w-full h-20 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none text-gray-700"
      ></textarea>

      {/* Submit Button */}
      <button className="w-full py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-md transition">
        Submit
      </button>
    </div>
  );
}

export default TextOnly;
