import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { getToken } from "./api/Auth";

import Login from "./components/Login";
import PatientRecords from "./components/PatientRecords";

function App() {
    const [token, setToken] = useState<string>();

    const handleGetToken = (username: string, password: string) => {
        getToken(username, password).then((json) => {
            console.log(json);
        });
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
