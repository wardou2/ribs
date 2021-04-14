import React from "react";
import { Link } from "react-router-dom";
import { Segment } from "semantic-ui-react";

import { AuthLevel } from "../interfaces";
import { useAuth } from "../util/Authenticate";

const Landing = () => {
    const { authLevel } = useAuth();
    return (
        <div>
            <Segment>
                Welcome to Virtual Therapeutics' RIBS Portal. Here you can find
                all the stuff you want and so forth.
                {authLevel === AuthLevel.None ? (
                    <div>
                        You do not have the necessary authorization to view any
                        records.
                    </div>
                ) : (
                    <ul>
                        <li>
                            <Link to="/records/1">Patient Records</Link>
                        </li>
                    </ul>
                )}
            </Segment>
        </div>
    );
};

export default Landing;
