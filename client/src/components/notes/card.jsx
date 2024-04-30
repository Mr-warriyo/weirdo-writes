import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ note }) => {
    const shareNote = () => {
        const URL = `https://weirdo-writes.onrender.com/notes/${note._id}`
        navigator.clipboard.writeText(URL)
        alert("Copied Note URL to CLipBoard, Share it with anyone; make sure their IDS are added to canRead/canEdit . \n" + URL)
    }

    return (
        <React.Fragment>
            <div className="m-8 p-8 text-indigo-500 border rounded-md shadow-md">
                <h3 className="text-2xl font-extrabold">{note.title}</h3>
                <hr className="w-full" />
                <p className="text-sm mt-2 mb-6">{note.content}</p> 
                <div className="flex justify-center items-center">
                    <Link to={`/notes/${note._id}`}>
                        <svg
                            className="h-8 w-8 cursor-pointer"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </Link>
                    |
                    <Link to={`/notes/delete/${note._id}`}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 cursor-pointer"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>  
                    </Link>
                </div>
                
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button
                        onClick={() => shareNote()}
                        style={{
                            backgroundColor: "red",
                            padding: "10px",
                            borderRadius: "25px",
                            color: "white",
                            cursor: "pointer"
                        }}
                    >
                        Share Note
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Card;
