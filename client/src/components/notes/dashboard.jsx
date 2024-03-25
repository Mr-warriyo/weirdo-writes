import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const DashBoardPage = () => {
    const {
        email,
        token,
        name
    } = window.localStorage || undefined;

    if (!email || !token || !name) {
        window.location.href = "/login"
        alert("No Session found! Redirecting to Login...")
    }
    return (
        <Fragment>
            
        </Fragment>
    )
};

export default DashBoardPage;