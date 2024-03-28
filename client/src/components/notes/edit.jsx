import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { TINY_MCE } from "../../env.js"
import { Editor } from '@tinymce/tinymce-react';

const Notes = () => {
    const { id } = useParams();
    const editorRef = useRef();
    const log = () => {
      if (editorRef.current) {
        console.log(editorRef.current.getContent("editor"));
      }
    };
    return (
      <div
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column"
        }} 
      >
        <button
          onClick={log}
          style={{
            backgroundColor: "red",
            margin: "20px",
            padding: "10px",
            borderRadius: "25px",
            color: "white",
          }}
        > 
          Save & Close
        </button>
        <Editor
          apiKey={TINY_MCE}
          onInit={(evt, editor) => editorRef.current = editor}
          initialValue="<h1>Weirdo Writes</h1>"
          init={{
            selector: "#editor",
            height: 1280,
            menubar: true,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
        />
      </div>
    )
  }

  export default Notes