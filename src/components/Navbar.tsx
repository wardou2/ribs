import React from "react";
import { User } from "../interfaces";

interface NavbarProps {
    user?: User;
    authLevel: string;
    handleSignOut: () => void;
}

const Navbar = ({ user, authLevel, handleSignOut }: NavbarProps) => {
    const getAuthLevelDisplay = () => {
        switch (authLevel) {
            case "Administrator":
                return "A";
            case "Clinician":
                return "C";
            default:
                return "";
        }
    };
    return (
        <div className="navbar">
            <div className="navbar__title">
                <div>KP MAISON</div>
            </div>
            <div className="navbar__user">
                <div className="navbar__user__level">
                    {getAuthLevelDisplay()}
                </div>
                <div>Logged in as:</div>
                <div>
                    {user?.firstname} {user?.lastname}
                </div>
                <div onClick={handleSignOut}>Log Out</div>
            </div>
        </div>
    );
};

export default Navbar;
