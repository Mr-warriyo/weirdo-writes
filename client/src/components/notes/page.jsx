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
                    <li key={number}>
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
            </ul>
        </nav>
    );
};

export default Pagination;
