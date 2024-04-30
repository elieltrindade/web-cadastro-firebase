import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from '../Firebase';

import Header from "./Header";
import './Estilos-globais.css'
import './Cadastro.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";




class Cadastro extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nome: "",
            sobrenome: "",
            dataNascimento: "",
            email: "",
            senha: "",
            currentDate: new Date()

        };
        this.gravar = this.gravar.bind(this);
    }

    /*async para nao travar a aplicação, devido o uso de serviço/aplicação externa*/
    async gravar() {
        try {

            if (!this.state.nome || !this.state.sobrenome || !this.state.dataNascimento || !this.state.email || !this.state.senha) {
                this.setState({ mensagem: "Por favor, preencha todos os campos" });
                return;
            }

            // Verifica se o email tem um formato válido
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.state.email)) {
                this.setState({ mensagem: "Por favor, insira um email válido" });
                return;
            }

            //Cria u usuário na autenticação
            await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.senha);

            //Obtém o UID do usuário recém-criado
            /*await nao continua o código antes de terminar, o processo desta função*/

            const user = firebase.auth().currentUser;
            const uid = user.uid;

            /*Para realizar cadastro com UID automatico
            await firebase.firestore().collection("usuario").add({ */

            await firebase.firestore().collection("usuario").doc(uid).set({
                nome: this.state.nome,
                sobrenome: this.state.sobrenome,
                dataNascimento: this.state.dataNascimento,
                email: this.state.email,
                senha: this.state.senha,
            });

            console.log("Usuário criado e dados gravados com sucesso!");
            window.location.href = "./login";

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                this.setState({ mensagem: 'O email já está sendo usado por outro usuário' });
            } else {
                this.setState({ mensagem: 'Por favor, preencha todos os dados' });
                console.error("Erro ao criar usuário ou gravar dados:", error);
            }
        };
    }


    render() {
        return (
            <div className="app-container">
                <div>
                    <Header />
                </div>

                <main className=" flex flex-center main-content-cadastro">

                    <div className="flex flex-center font-principal content-cadastro">
                        <div className='wrapper'>
                            <h1 className="flex flex-center font-principal titulo-cadastro">Cadastre-se</h1>

                            <div className="font-descricao descricao-campo-cadastro ">Nome: <br />
                                <input type="text" className="font-descricao campo-cadastro" id="campoNome" size="20" placeholder="Seu primeiro nome" onChange={(e) => this.setState({ nome: e.target.value })} />
                            </div>
                            <div className="font-descricao descricao-campo-cadastro">Sobrenome: <br />
                                <input type="text" className="font-descricao campo-cadastro" id="campoSobrenome" size="20" placeholder="Seu sobrenome" onChange={(e) => this.setState({ sobrenome: e.target.value })} />
                            </div >
                            <div className="font-descricao descricao-campo-cadastro">Data de nascimento: <br />
                                <input type="date" className="font-descricao campo-cadastro" id="campoDataNascimento" size="20" placeholder="Data de seu nascimento" onChange={(e) => this.setState({ dataNascimento: e.target.value })} />
                            </div>
                            <div className="font-descricao descricao-campo-cadastro">E-mail: <br />
                                <input type="email" className="font-descricao campo-cadastro" id="campoEmail" size="20" placeholder="insira seu e-mail" onChange={(e) => this.setState({ email: e.target.value })} />
                            </div>
                            <div className="font-descricao descricao-campo-cadastro">Senha: <br />
                                <input type="password" className="font-descricao campo-cadastro" id="campoSenha" size="20" placeholder="crie sua senha" onChange={(e) => this.setState({ senha: e.target.value })} />
                            </div>
                            <div className="flex flex-center">
                                <button onClick={this.gravar} className="font-descricao">Gravar</button>
                            </div>
                            <div className={`mensagem ${this.state.mensagem ? "error" : "sucesso"}`}>
                                {this.state.mensagem}
                            </div>

                        </div>
                    </div>
                </main >
            </div >
        )

    }
}
export default Cadastro;