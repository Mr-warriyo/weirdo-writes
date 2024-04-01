import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from './card'; 
import Pagination from './page'; 

const DashBoardPage = () => {
    const [phone, setPhone] = useState(false);
    const [notes, setNotes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const notesPerPage = 3;

    const handleResize = () => {
        setPhone(window.innerWidth <= 768);
    };

    const {
        name,
        email,
        token
    } = window.localStorage || undefined;
    
    if (!name || !email || !token) {
        window.location.href = "/login"
        alert("No Session found! Redirecting to Login...")
    }


    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch("http://localhost:8081/note/req", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        token
                    })
                });
                const data = await response.json();
                if (data.status === "SUCCESS") {
                    setNotes(data.editNotes);
                    console.log(data.editNotes, data.readNotes, data.unqNote)
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error(error);
                alert("Failed to fetch notes");
            }
        };

        fetchNotes();
    }, []);

    const indexOfLastNote = currentPage * notesPerPage;
    const indexOfFirstNote = indexOfLastNote - notesPerPage;
    const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <Fragment>
            <div className="flex h-screen">
                <div className="flex flex-col w-full">
                    <div className="w-full h-20 bg-transparent font-extrabold text-indigo-500 border-b-4 border-indigo-500">
                        <div className="flex justify-between items-center h-full">
                            <div className="flex items-center ml-8">
                                <h1 className="font-headingM text-3xl">
                                    Weirdo Writes
                                </h1>
                            </div> 
                            <div className="flex items-center m-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="flex m-8 justify-center h-1/4">
                        <div className="bg-scroll bg-transparent text-red-800">
                            <h1 className="font-headingM font-extrabold text-5xl">
                                Welcome {name}!
                            </h1>
                        </div>
                    </div>
                    <div className={`flex m-8 justify-center ${phone ? "md-block flex-col ": "h-screen flex-row"}`}>
                        {currentNotes.length > 0 ? (
                            currentNotes.map(note => (
                                <Card key={note.id} note={note} />
                            ))
                        ) : (
                            <p>No notes found.</p>
                        )}
                    </div>
                    <Pagination
                        notesPerPage={notesPerPage}
                        totalNotes={notes.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default DashBoardPage;
