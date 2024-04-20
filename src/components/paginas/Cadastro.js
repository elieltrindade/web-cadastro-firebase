import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from '../Firebase';

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
            this.setState({ mensagem: 'Por favor, preencha todos os dados' })
            console.error("Erro ao criar usuário ou gravar dados:", error);
        };
    }


    render() {
        return (
            <div className="app-container">
                <header>
                    <Link to="/login" className="header-link">Login</Link>
                    <Link to="/" className="header-link">Fazer Cadastro</Link>
                    <Link to="/principal" className="header-link">Principal</Link>
                </header>

                <h1 className="titulo">Página de Cadastro</h1>

                <main className="main-content-cadastro">
                    <div className="left-content-cadastro">
                        <div className='wrapper-cadastro'>
                            <div className="descricaoCampo">Nome: <br />
                                <input type="text" className="campo-cadastro" id="campoNome" size="20" placeholder="Seu primeiro nome" onChange={(e) => this.setState({ nome: e.target.value })} />
                            </div>
                            <div className="descricaoCampo">Sobrenome: <br />
                                <input type="text" className="campo-cadastro" id="campoSobrenome" size="20" placeholder="Seu sobrenome" onChange={(e) => this.setState({ sobrenome: e.target.value })} />
                            </div >
                            <div className="descricaoCampo">Data de nascimento: <br />
                                <input type="date" className="campo-cadastro-date" id="campoDataNascimento" size="20" placeholder="Data de seu nascimento" onChange={(e) => this.setState({ dataNascimento: e.target.value })} />
                            </div>
                            <div className="descricaoCampo">E-mail: <br />
                                <input type="email" className="campo-cadastro" id="campoEmail" size="20" placeholder="insira seu e-mail" onChange={(e) => this.setState({ email: e.target.value })} />
                            </div>
                            <div className="descricaoCampo">Senha: <br />
                                <input type="password" className="campo-cadastro" id="campoSenha" size="20" placeholder="crie sua senha" onChange={(e) => this.setState({ senha: e.target.value })} />
                            </div>
                            <div className="div-botao-gravar">
                                <button onClick={this.gravar}>Gravar</button>
                            </div>
                        </div>
                    </div>
                    <div className="right-content">
                        <h1>Bem Vindo!</h1>
                        <div className="div-icon-Cadastro">
                            <FontAwesomeIcon className="icon-cadastro" icon={faPenToSquare} />
                        </div>
                        <div className={`mensagem ${this.state.mensagem ? "error" : "sucesso"}`}>
                            {this.state.mensagem}
                        </div>

                    </div>
                </main >
            </div >
        )

    }
}
export default Cadastro;