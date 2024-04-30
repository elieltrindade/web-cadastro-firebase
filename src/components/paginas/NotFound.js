import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGhost } from '@fortawesome/free-solid-svg-icons';
import './Estilos-globais.css';
import './NotFound.css';


function NotFound() {

    return (
       
        <main className="flex flex-center main-content-notfound">            
            <div className="div-icon-notfound">
                <FontAwesomeIcon className='icon-notfound' icon={faGhost} />                
            </div>            
                <h1>404 - Página não encontrada </h1>            
        </main>

    )
}
export default NotFound;