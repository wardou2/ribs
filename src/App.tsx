import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Cookies from "js-cookie";

import { getToken } from "./api/Auth";

import Login from "./components/Login";
import PatientRecords from "./components/PatientRecords";

function App() {
    const [token, setToken] = useState<string>();

    useEffect(() => {
        const cookieToken = Cookies.get("token");
        if (cookieToken) {
            setToken(cookieToken);
        }
    }, []);

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
            .catch((err) => console.log(err));
    };

    if (!token) {
        return <Login handleSubmit={handleGetToken} />;
    }

    return (
        <div>
            <h1>RIBS</h1>
            <BrowserRouter>
                <Switch>
                    <Route path="/records">
                        <PatientRecords />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
