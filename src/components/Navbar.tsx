import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { Button } from "semantic-ui-react";
import { User } from "../interfaces";

interface NavbarProps {
    user: User | undefined;
    authLevel: string;
    handleSignOut: (cb: () => any) => void;
    history: any;
}

const Navbar = ({
    user,
    authLevel,
    handleSignOut,
    history,
}: NavbarProps & RouteComponentProps) => {
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
                <Button
                    compact
                    size="mini"
                    onClick={() => handleSignOut(() => history.push("/"))}
                >
                    Log Out
                </Button>
            </div>
        </div>
    );
};

export default withRouter(Navbar);
