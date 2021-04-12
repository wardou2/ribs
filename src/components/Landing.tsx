import React from "react";
import { Link } from "react-router-dom";
import { AuthLevel } from "../interfaces";

import { useAuth } from "../util/Authenticate";

const Landing = () => {
    const { authLevel } = useAuth();
    return (
        <div>
            {authLevel === AuthLevel.None ? (
                <div>
                    You do not have the necessary authorization to view any
                    records.
                </div>
            ) : (
                <Link to="/records">Patient Records</Link>
            )}
        </div>
    );
};

export default Landing;
