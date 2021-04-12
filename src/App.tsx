import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import PatientRecords from "./components/PatientRecords";
import useToken from "./util/useToken";
import { User, AuthLevel } from "./interfaces";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import ViewPatient from "./components/ViewPatient";
import EditPatient from "./components/EditPatient";

import { getToken, getCurrentUser } from "./api/Auth";

function App() {
    const [user, setUser] = useState<User | undefined>();
    const [authLevel, setAuthLevel] = useState<AuthLevel>("");

    const { token, setToken, clearToken } = useToken();

    /** Get current user  */
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const fetchUser = async () => {
            try {
                const user = await getCurrentUser();
                setUser(user);
            } catch (e) {
                // TODO: Better error handling
                // alert(e);
            }
        };
        fetchUser();
    }, []);

    // Set auth levels when user is updated
    useEffect(() => {
        setAuthLevel(() => {
            if (!user) return "";

            let currHighestAuth = "";
            for (let i = 0; i < user.roles.length; i += 1) {
                const role = user.roles[i];
                if (role.name === "Administrator") {
                    return "Administrator";
                } else if (role.name === "Clinician") {
                    currHighestAuth = "Clinician";
                }
            }
            return currHighestAuth as AuthLevel;
        });
    }, [user, setAuthLevel]);

    const handleSignIn = async (
        email: string,
        password: string,
        remember: boolean
    ) => {
        const res = await getToken(email, password);
        setToken(res.access_token);
        const user = await getCurrentUser();
        setUser(user);
    };

    const handleSignOut = (cb: () => any) => {
        clearToken();
        setUser(undefined);
        cb();
    };

    if (!token) {
        return <Login handleSignIn={handleSignIn} />;
    }

    return (
        <div className="app-container">
            <BrowserRouter>
                <Navbar
                    user={user}
                    authLevel={authLevel}
                    handleSignOut={handleSignOut}
                />
                <Switch>
                    <Route path={`/records/:patientId`}>
                        <ViewPatient />
                    </Route>
                    <Route exact path={`/records/edit/:patientId`}>
                        <EditPatient />
                    </Route>
                    <Route path="/records">
                        <PatientRecords />
                    </Route>
                    <Route exact path="/">
                        <Landing authLevel={authLevel} />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
