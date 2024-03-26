import React from 'react';

const Card = ({ note }) => {
    return (
        <div className="m-8 p-8 text-indigo-500 border rounded-md shadow-md">
            <h3 className="text-2xl font-extrabold">{note.title}</h3>
            <hr className="w-full" />
            <p className="text-sm mt-2">{note.content}</p>
        </div>
    );
};

export default Card;
