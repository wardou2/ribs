import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import Login from "./components/Login";
import PatientRecords from "./components/PatientRecords";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import ViewPatient from "./components/ViewPatient";
import EditPatient from "./components/EditPatient";
import NewPatient from "./components/NewPatient";
import DeletePatient from "./components/DeletePatient";

import { PrivateRoute, ProvideAuth } from "./util/Authenticate";
import { AuthLevel } from "./interfaces";

function App() {
    return (
        <div className="app-container">
            <ProvideAuth>
                <BrowserRouter>
                    <Navbar />
                    <Switch>
                        <PrivateRoute
                            requiredAuthLevel={AuthLevel.Administrator}
                            exact
                            path={`/records/edit/:patientId`}
                        >
                            <EditPatient />
                        </PrivateRoute>
                        <PrivateRoute
                            requiredAuthLevel={AuthLevel.Administrator}
                            exact
                            path={`/records/delete/:patientId`}
                        >
                            <DeletePatient />
                        </PrivateRoute>
                        <PrivateRoute
                            requiredAuthLevel={AuthLevel.Administrator}
                            exact
                            path={`/records/new`}
                        >
                            <NewPatient />
                        </PrivateRoute>
                        <PrivateRoute
                            requiredAuthLevel={AuthLevel.Clinician}
                            exact
                            path={`/records/view/:patientId`}
                        >
                            <ViewPatient />
                        </PrivateRoute>
                        <PrivateRoute
                            requiredAuthLevel={AuthLevel.Clinician}
                            exact
                            path="/records/:viewPage"
                        >
                            <PatientRecords />
                        </PrivateRoute>
                        <PrivateRoute
                            requiredAuthLevel={AuthLevel.None}
                            exact
                            path="/"
                        >
                            <Landing />
                        </PrivateRoute>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <PrivateRoute
                            requiredAuthLevel={AuthLevel.None}
                            path="*"
                        >
                            <div>
                                Sorry, we couldn't access this page.{" "}
                                <Link to="/">Back to Dashboard</Link>
                            </div>
                        </PrivateRoute>
                    </Switch>
                </BrowserRouter>
            </ProvideAuth>
        </div>
    );
}

export default App;
