import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import PatientRecords from "./components/PatientRecords";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import ViewPatient from "./components/ViewPatient";
import EditPatient from "./components/EditPatient";

import { PrivateRoute, ProvideAuth } from "./util/Authenticate";

function App() {
    return (
        <div className="app-container">
            <ProvideAuth>
                <BrowserRouter>
                    <Navbar />
                    <Switch>
                        <PrivateRoute path={`/records/:patientId`}>
                            <ViewPatient />
                        </PrivateRoute>
                        <PrivateRoute exact path={`/records/edit/:patientId`}>
                            <EditPatient />
                        </PrivateRoute>
                        <PrivateRoute path="/records">
                            <PatientRecords />
                        </PrivateRoute>
                        <PrivateRoute exact path="/">
                            <Landing />
                        </PrivateRoute>
                        <Route path="/login">
                            <Login />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </ProvideAuth>
        </div>
    );
}

export default App;
