// import React, { useState } from 'react';
// import SunEditor from 'suneditor-react';
// import 'suneditor/dist/css/suneditor.min.css';

// const Editor = () => {
   
//   const[data , setData] = useState('<p> Your content </p>')

//   const handleChange = (content) => {
//     console.log("Editor content:", content);
//     setData(content);
//   };

//   return (
//    <>
//      <SunEditor
//     placeholder='Write here'
//     onChange={handleChange}
//     height="350px"
//     width='100%'
//     autoFocus = {true}
//     // disable={true}
//     //  hide={true} 
//      setOptions={{
//      buttonList: [
//       [
//             'undo', 'redo',
//             'font', 'fontSize', 'formatBlock',
//             'paragraphStyle', 'blockquote',
//             'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript',
//             'fontColor', 'hiliteColor', 'textStyle',
//             'removeFormat',
//             'outdent', 'indent',
//             'align', 'horizontalRule', 'list', 'lineHeight',
//             'table', 'link', 'image', 'video', 'audio',
//              'imageGallery',
//             'fullScreen', 'showBlocks', 'codeView',
//             'preview', 'print'
//           ]
//     ]
//   }}
// />

// {/* <h4>Preview</h4>
//   <div dangerouslySetInnerHTML={{ __html: data }} /> */}

//    </>

//   );
// };

// export default Editor;


"use client";

import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const Editor = ({ value, onChange }) => {
  return (
    <>
      <SunEditor
        setContents={value}
        placeholder="Write page content here..."
        height="350px"
        width="100%"
        autoFocus={false}
        onChange={onChange}
        setOptions={{
          buttonList: [
            [
              "undo",
              "redo",
              "font",
              "fontSize",
              "formatBlock",
              "bold",
              "underline",
              "italic",
              "strike",
              "fontColor",
              "hiliteColor",
              "removeFormat",
              "align",
              "list",
              "lineHeight",
              "table",
              "link",
              "image",
              "video",
              "fullScreen",
              "codeView",
            ],
          ],
        }}
      />
    </>
  );
};

export default Editor;

