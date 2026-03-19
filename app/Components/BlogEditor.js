/* eslint-disable react-hooks/preserve-manual-memoization */
// "use client";

// import dynamic from "next/dynamic";
// import { useMemo } from "react";
// import "react-quill-new/dist/quill.snow.css";

// const ReactQuill = dynamic(() => import("react-quill-new"), {
//   ssr: false,
// });

// export default function BlogEditor({ value, onChange }) {
//   const modules = useMemo(() => ({
//     toolbar: [
//       [{ header: [1, 2, false] }],
//       ["bold", "italic", "underline"],
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["link", "image"],
//       ["clean"],
//     ],
//   }), []);

//   return (
//     <ReactQuill
//       theme="snow"
//       value={value}
//       onChange={onChange}
//       modules={modules}
//       style={{ height: "300px", marginBottom: "50px" }}
//     />
//   );
// }
"use client";

import dynamic from "next/dynamic";
import { useMemo, useRef } from "react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
});

export default function BlogEditor({ value, onChange }) {
  const quillRef = useRef();

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        [{ align: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        ["blockquote", "code-block"],
        ["link", "image", "video"],
        ["clean"],
      ],
      handlers: {
        image: () => handleImageUpload(),
      },
    },
  }), []);

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "align",
    "list",
    "bullet",
    "indent",
    "blockquote",
    "code-block",
    "link",
    "image",
    "video",
  ];

  // Custom Image Upload Handler
  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      // 👉 Replace this with your API upload logic
      const imageUrl = URL.createObjectURL(file);

      const quill = quillRef.current.getEditor();
      const range = quill.getSelection();

      quill.insertEmbed(range.index, "image", imageUrl);
    };
  };

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      style={{ height: "300px", marginBottom: "50px" }}
    />
  );
}