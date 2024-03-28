import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from './card'; 
import Pagination from './page'; 

const DashBoardPage = () => {
    const [phone, setPhone] = useState(false);
    /* const [showSidebar, setShowSidebar] = useState(false);
 */
    useEffect(() => {
        const handleResize = () => {
            setPhone(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    /* const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    }; */

    const {
        name,
        email,
        token
    } = window.localStorage || undefined;
    
    if (!name || !email || !token) {
        window.location.href = "/login"
        alert("No Session found! Redirecting to Login...")
    }

    const [notes, setNotes] = useState([
        { id: 1, title: 'Note 1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { id: 2, title: 'Note 2', content: 'Praesent vehicula mauris id mauris eleifend, e.' },
        { id: 3, title: 'Note 3', content: 'Sed vel est sit amet urna tristique mollis..............' },
        { id: 4, title: 'Note 4', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { id: 5, title: 'Note 5', content: 'Praesent vehicula mauris id mauris eleifend, et suscipit elit aliquam.' },
        { id: 6, title: 'Note 6', content: 'Sed vel est sit amet urna tristique mollis.' },
        { id: 7, title: 'Note 7', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { id: 8, title: 'Note 8', content: 'Praesent vehicula mauris id mauris eleifend, et suscipit elit aliquam.' },
        { id: 9, title: 'Note 9', content: 'Sed vel est sit amet urna tristique mollis.' },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const notesPerPage = 3;
    const indexOfLastNote = currentPage * notesPerPage;
    const indexOfFirstNote = indexOfLastNote - notesPerPage;
    const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <Fragment>
            <div className="flex h-screen">
                {/* <div className={`${phone ? (showSidebar ? 'w-4/5' : 'w-0') : 'md:w-1/5'} bg-blue-100 transition-all duration-300`}>
                    <div className="flex flex-col justify-content items-center">
                        <h1 className="m-8">
                            Weirdo Writes
                        </h1>
                        <ul>
                            <li>
                                
                            </li>
                            <li>2</li>
                            <li>3</li>
                        </ul>
                    </div>
                </div> */}

                <div className="flex flex-col w-full">
                    <div className="w-full h-20 bg-transparent font-extrabold text-indigo-500 border-b-4 border-indigo-500">
                        <div className="flex justify-between items-center h-full">
                            <div className="flex items-center ml-8">
                             {/*    {phone ? (
                                    <svg onClick={toggleSidebar} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 cursor-pointer">
                                        <path fillRule="evenodd" d="M2 3.75A.75.75 0 0 1 2.75 3h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 3.75Zm0 4.167a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Zm0 4.166a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Zm0 4.167a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                                    </svg>
                                ) : "x"} */}
                                <h1 className="font-headingM text-3xl">
                                    Weirdo Writes
                                </h1>
                            </div> 
{/*                             <div className="flex items-center justify-center">z</div>
 */}                        <div className="flex items-center m-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="flex m-8 justify-center h-1/4">
                        <div className="bg-scroll bg-transparent text-red-800">
                            <h1 className="font-headingM font-extrabold text-5xl">
                                Welcome {name} !
                            </h1>
                        </div>
                    </div>
                    
                    <div className={`flex m-8 justify-center ${phone ? "md-block flex-col ": "h-screen flex-row"}`}>
                        {currentNotes.map(note => (
                            <Card key={note.id} note={note} />
                        ))}
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
