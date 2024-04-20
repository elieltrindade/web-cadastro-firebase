import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from '../Firebase';
import './Estilos-globais.css'
import './Principal.css';

/*Irá montar o componente vazio*/
class Principal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: "",
            sobrenome: "",
            dataNascimento: "",
            email: "",

        }
    }

    /*Atualiza o componente automaticamente conforme carregar, sem precisar um botao de atualizar*/
    async componentDidMount() {

        await firebase.auth().onAuthStateChanged(async (usuario) => {
            if (usuario) {
                var uid = usuario.uid;

                await firebase.firestore().collection("usuario").doc(uid).get()
                    .then((retorno) => {

                        this.setState({
                            nome: retorno.data().nome,
                            sobrenome: retorno.data().sobrenome,
                            dataNascimento: retorno.data().dataNascimento,
                            email: retorno.data().email

                        });
                    });

            }
        });
    }


    render() {
        return (
            <div className="app-container">
                <header>
                    <Link to="/login" className="header-link">Login</Link>
                    <Link to="/" className="header-link">Fazer Cadastro</Link>
                    <Link to="/principal" className="header-link">Principal</Link>
                </header>

                <main className="main-content-principal">
                    <div className="centered-content">
                        <div className="wrapper-principal">
                            <h1>Principal</h1>
                            <span className='descricao'>Nome:</span>
                            <span className="resposta">{this.state.nome} </span> 
                            <br /><br />
                            <span className="descricao">Sobrenome:</span>
                            <span className='resposta'> {this.state.sobrenome} </span> 
                            <br /><br />
                            <span className="descricao">Data de Nascimento:</span>
                            <span className='resposta'>{this.state.dataNascimento.toLocaleString()} </span>
                            <br /><br /> 
                            <span className="descricao">E-mail:</span>
                            <span className='resposta'>{this.state.email} </span> <br />
                        </div>
                    </div>
                </main>
            </div>

        )
    }
}

export default Principal;