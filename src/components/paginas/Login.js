import React from "react";
import { Link } from "react-router-dom";

function Login() {
    return(
        <div>
            <h1>Login</h1>
            <Link to="/cadastro"><button>Fazer Cadastro</button></Link>
            <Link to="/principal"><button>Contato</button></Link>
        </div>
    )

}
export default Login;