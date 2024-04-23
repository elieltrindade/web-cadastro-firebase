import React from "react";
import { Link } from "react-router-dom";
import './Header.css'


const Header = (props) => {
    return (
        <header className="flex flex-between">
           <div className="flex-left">
            <h1 className="font-principal title-header">Cadastro-Web</h1>
           </div>           
            <div className='flex flex-right'>
                <div>
                    <Link to="/" className="font-descricao header-links">Cadastro </Link>
                    <Link to="/login" className="font-descricao header-links">Login </Link>
                    <Link to="/principal" className="font-descricao header-links">Principal </Link>
                </div>
            </div>
        </header>
    );
}
export default Header;