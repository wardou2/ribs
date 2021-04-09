import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Cookies from "js-cookie";

import { getCurrentUser, getToken } from "./api/Auth";

import Login from "./components/Login";
import PatientRecords from "./components/PatientRecords";
import { User, AuthLevel } from "./interfaces";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import ViewPatient from "./components/ViewPatient";
import EditPatient from "./components/EditPatient";

function App() {
    const [token, setToken] = useState<string>();
    const [user, setUser] = useState<User | undefined>();
    const [authLevel, setAuthLevel] = useState<AuthLevel>("");

    // Check for cookie token on first render
    useEffect(() => {
        const cookieToken = Cookies.get("token");

        if (cookieToken) {
            getCurrentUser().then((user) => setUser(user));

            setToken(cookieToken);
        }
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

    const handleGetToken = (
        username: string,
        password: string,
        remember: boolean
    ) => {
        getToken(username, password)
            .then((res) => {
                if (res.access_token) {
                    remember && Cookies.set("token", res.access_token);
                    setToken(res.access_token);
                }
            })
            .then(() => getCurrentUser().then((user) => setUser(user)))
            .catch((err) => console.log(err));
    };

    if (!token) {
        return <Login handleSubmit={handleGetToken} />;
    }

    return (
        <div className="app-container">
            <BrowserRouter>
                <Navbar user={user} authLevel={authLevel} />
                <Switch>
                    <Route exact path={`/records/:patientId`}>
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
