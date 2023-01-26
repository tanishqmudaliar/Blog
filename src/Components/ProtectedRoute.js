import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from "../Context/UserAuthContext.js";

function ProtectedRoute(props) {
    const { Component } = props;
    const navigate = useNavigate();
    const { user } = useUserAuth();
    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    })
    return (
        <div>
            <Component />
        </div>
    )
}

export default ProtectedRoute