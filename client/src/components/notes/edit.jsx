import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';

const TINY_MCE = process.env.TINY_MCE

const Notes = () => {
    const { id } = useParams();
    const [noteFound, setNoteFound] = useState(false);
    const [note, setNote] = useState()
    const token = window.localStorage.getItem("token")
    const [noteC, setNoteC] = useState("")
    console.log(process.env.TINY_MCE)

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await fetch(`https://weirdo-writes.onrender.com/note/nId`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id,
                        token
                    })
                })
                const data = await response.json()
                if (data.status.toLowerCase() === "success") {
                    setNoteFound(true);
                    setNote(data.note)
                    setNoteC(data.note.noteC ? data.note.noteC : data.note.content);
                } else {
                    window.location.href = "/dashboard"
                    alert(`Note Not Found, Redirecting you to dashboard.`)
                }
            } catch (error) {
                alert("FAILED:", error.message)
                console.error(error)
            }
        };

        fetchNote();
    }, [id]);

    const editorRef = useRef();
    const log = async () => {
        if (editorRef.current) {
            const noteC = await editorRef.current.getContent("editor");
            const { title, content, canRead, canEdit } = note;
            const response = await fetch(`https://weirdo-writes.onrender.com/note/edit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    noteId: id,
                    token,
                    title,
                    noteC,
                    content,
                    canRead,
                    canEdit
                })
            })

            const data = await response.json()
            if (data.status.toLowerCase() === "success") {
                window.location.href = "/dashboard"
                alert(`Changes committed, Redirecting you to dashboard.`)
            } else {
                alert("Something went wrong")
            }
        }
    };

    if (!noteFound) {
        return null;
    }


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
                initialValue={noteC}
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
    );
}

export default Notes;
