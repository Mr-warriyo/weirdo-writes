import React, { useState, useEffect } from "react";

const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [canRead, setCanRead] = useState("");
  const [canEdit, setCanEdit] = useState("");
  const owner = window.localStorage.getItem("token");

  async function submit(e) {
    e.preventDefault();
    try {
      // Append owner id to canRead and canEdit arrays
      const canReadWithOwner = (canRead ? canRead + ',' : '') + owner;
      const canEditWithOwner = (canEdit ? canEdit + ',' : '') + owner;
  
      const response = await fetch(`https://weirdo-writes.onrender.com/note/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          canRead: canReadWithOwner,
          canEdit: canEditWithOwner,
          owner
        }),
      });
      const data = await response.json();
      alert(`${data.status}: ${data.message}`);
      if (data.status.toLowerCase() === "success") {
        alert("Note Created Successfully!");
        window.location.href = `/notes/${data.noteId}`
      }
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  }
  

  return (
    <React.Fragment>
      <form className="min-h-screen flex items-center justify-center p-8" onSubmit={submit}>
        <div className="p-8 rounded shadow-lg w-96 halo">
          <h2 className="text-2xl text-black font-extrabold mb-6 text-center">
            Create A Note
          </h2>
          <div className="mb-4">
            <label htmlFor="text" className="block text-sm font-medium text-gray-800">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your Note's Title"
              onChange={(e) => setTitle(e.target.value)}
              autoComplete='title'
              maxLength={20}
              minLength={1}
              required
            />
            <br />
            <br />
            <p className="text-white text-xs italic">Minimum 1 and maximum 20 characters</p>
          </div>
          <div className="mb-4">
            <label htmlFor="text" className="block text-sm font-medium text-gray-800">
              Description
            </label>
            <input
              type="text"
              id="descp"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your Note's Description"
              onChange={(e) => setContent(e.target.value)}
              maxLength={20}
              minLength={1}
              autoComplete='descp'
              required
            />
            <br />
            <br />
            <p className="text-white text-xs italic">Minimum 1 and maximum 20 characters</p>
          </div>
          <div className="mb-4">
            <label htmlFor="text" className="block text-sm font-medium text-gray-800">
              Can Read
            </label>
            <input
              type="text"
              id="read"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter IDS of your friends who can read"
              onChange={(e) => setCanRead(e.target.value)}
              maxLength={20}
              pattern="^[\d\s,]+$"
              minLength={1}
              autoComplete='read'
            />
            <br />
            <br />
            <p className="text-white text-xs italic">Split the Numerical IDS with ","</p>
          </div>
          <div className="mb-4">
            <label htmlFor="text" className="block text-sm font-medium text-gray-800">
              Can Edit
            </label>
            <input
              type="text"
              id="edit"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter IDS of your friends who can edit"
              onChange={(e) => setCanEdit(e.target.value)}
              pattern="^[\d\s,]+$"
              maxLength={20}
              minLength={1}
              autoComplete='edit'
            />
            <br />
            <br />
            <p className="text-white text-xs italic">Split the Numerical IDS with ","</p>
          </div>
          
          <button type='submit' className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
            Create Note
          </button>
        </div>
      </form>
    </React.Fragment>
  );
}

export default Create;
