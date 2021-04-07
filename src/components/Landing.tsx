import React from "react";
import { Link } from "react-router-dom";
import { AuthLevel } from "../interfaces";

interface LandingProps {
    authLevel: AuthLevel;
}

const Landing = ({ authLevel }: LandingProps) => {
    return (
        <div>
            {authLevel === "Administrator" || authLevel === "Clinician" ? (
                <Link to="/records">Patient Records</Link>
            ) : (
                <div>
                    You do not have the necessary authorization to view any
                    records.
                </div>
            )}
        </div>
    );
};

export default Landing;
