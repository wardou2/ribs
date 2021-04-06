import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import PatientRecords from "./components/PatientRecords";

function App() {
    const [token, setToken] = useState<string>();

    if (!token) {
        return <Login />;
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
