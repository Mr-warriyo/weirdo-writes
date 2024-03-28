import React from 'react';

const Pagination = ({ notesPerPage, totalNotes, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalNotes / notesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="mt-4">
            <ul className="flex justify-center">
                {pageNumbers.map(number => (
                    <li key={number}> {/* Assign a unique key prop to each <li> element */}
                        <button
                            onClick={() => paginate(number)}
                            className={`${
                                currentPage === number ? 'bg-blue-500 text-white' : 'text-indigo-500 border border-white-500'
                            } m-4 px-4 py-2 mx-1 rounded-md focus:outline-none`}
                        >
                            {number}
                        </button>
                    </li>
                ))}
                <li>
                    <svg className="w-10 h-10 m-4 px-2 py-2 mx-1 text-indigo-500 border border-white-500 hover:bg-blue-500 hover:text-white rounded-md hover:outline-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
