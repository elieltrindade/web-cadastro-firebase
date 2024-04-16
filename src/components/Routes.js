import React from "react";


import Cadastro from "./paginas/Cadastro";
import Principal from "./paginas/Principal";
import Login from "./paginas/Login";
import NotFound from "./paginas/NotFound";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route exact={true} path="/" element={<Login />} />
                <Route exact={true} path="/cadastro" element={<Cadastro />} />
                <Route exact={true} path="/principal" element={<Principal />} />
                <Route exact={true} path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )
}
export default AppRoutes;