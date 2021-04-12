import React from "react";
import { useHistory } from "react-router-dom";

import { Button } from "semantic-ui-react";

import { useAuth } from "../util/Authenticate";

const Navbar = () => {
    const auth = useAuth();
    const { user, handleSignOut, authLevel } = auth;

    let history = useHistory();

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
            {user && (
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
                        onClick={() =>
                            handleSignOut(() => {
                                history.push("/login");
                            })
                        }
                    >
                        Log Out
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Navbar;
