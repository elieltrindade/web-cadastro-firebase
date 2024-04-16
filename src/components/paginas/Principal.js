import React from "react";
import { Link } from "react-router-dom";


function Principal() {
    return(
        <div>
            <h1>Principal</h1>
            <Link to="/cadastro"><button>Novo Cadastro</button></Link>
            
        </div>
    )
}
export default Principal;