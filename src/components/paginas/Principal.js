import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from '../Firebase';
import './Estilos-globais.css'
import './Principal.css';
import Header from "./Header";

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
                <div>
                    <Header/>
                </div>

                <main className="flex flex-center main-content-principal">
                    <div className="centered-content">
                        <div className="wrapper-principal">
                            <h1 className='flex flex-center font-principal'>Principal</h1>
                            <span className='font-descricao descricao-principal'>Nome: </span>
                            <span className=" font-principal data-user">{this.state.nome} </span> 
                            <br /><br />
                            <span className="font-descricao descricao-principal">Sobrenome: </span>
                            <span className='font-principal data-user'>{this.state.sobrenome} </span> 
                            <br /><br />
                            <span className="font-descricao descricao-principal">Data de Nascimento: </span>
                            <span className='font-principal data-user'>{this.state.dataNascimento.toLocaleString()} </span>
                            <br /><br /> 
                            <span className="font-descricao descricao-principal">E-mail: </span>
                            <span className='font-principal data-user'>{this.state.email} </span> <br />
                        </div>
                    </div>
                </main>
            </div>

        )
    }
}

export default Principal;