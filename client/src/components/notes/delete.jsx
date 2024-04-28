import React from "react";
import { Link, useParams } from "react-router-dom";

const Delete = () => {
    const { id } = useParams()
    const token = window.localStorage.getItem("token")

    const delNote = async () => {
        console.log(id)
        const response = await fetch("http://localhost:8081/note/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                noteId: id,
                token
            })
        })
        const data = await response.json()
        alert(`${data.status}: ${data.message}`)
        window.location.href = "/dashboard"
    }
    
    return (
        <React.Fragment>
            <div
                style={{
                    padding: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    color: "white"
                }}
            > 
                <h1>
                    Are you sure that you wish to delete the Note({id}) ?
                </h1>
                <button
                    onClick={delNote}
                    style={{
                        backgroundColor: "red",
                        margin: "20px",
                        padding: "10px",
                        borderRadius: "25px",
                        color: "white",
                    }}
                >
                    Yes, delete
                </button>
                <button
                    style={{
                        backgroundColor: "red",
                        margin: "20px",
                        padding: "10px",
                        borderRadius: "25px",
                        color: "white",
                    }}
                >
                    <Link to="/dashboard"> No, return to dashboard</Link>
                </button>
            </div>
        </React.Fragment>
    )
}

export default Delete