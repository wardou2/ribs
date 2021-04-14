import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Divider } from "semantic-ui-react";

import { AuthLevel } from "../interfaces";
import { useAuth } from "../util/Authenticate";

const Navbar = () => {
    const auth = useAuth();
    const { user, handleSignOut, authLevel } = auth;

    let history = useHistory();

    const getAuthLevelDisplay = () => {
        switch (authLevel) {
            case AuthLevel.Administrator:
                return "A";
            case AuthLevel.Clinician:
                return "C";
            default:
                return "";
        }
    };
    if (!user) return <></>;
    return (
        <>
            <div className="navbar">
                <div className="navbar__title">
                    <div>KP MAISON</div>
                </div>
                {user && (
                    <div className="navbar__user">
                        <div className="navbar__user__level">
                            {getAuthLevelDisplay()}
                        </div>

                        <div>
                            {user?.firstname} {user?.lastname}
                        </div>
                        <div>
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
                    </div>
                )}
            </div>
            <Divider />
        </>
    );
};

export default Navbar;
