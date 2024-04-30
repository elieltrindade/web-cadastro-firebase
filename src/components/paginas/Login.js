import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Estilos-globais.css'
import './Login.css'
import Header from "./Header";
import firebase from '../Firebase';


class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            usuario: [{ email: "jorge@jorge", senha: "jorge" }],
            email: "",
            senha: ""
        };
        this.validar = this.validar.bind(this);
    }

    preencherCampo(event, campo) {
        const value = event.target.value;
        this.setState({
            [campo]: value
        });
    }

    async validar() {
        await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.senha)
            .then(() => {
                window.location.href = "./principal";
            })
            .catch((erro) => {
                this.setState({ mensagem: "Usuário ou senha incorretos!" })
            });
    }

    render() {
        return (
            <div className="app-container">
                <div>
                    <Header />
                </div>
                <main className="flex flex-center main-content">
                    <div className="centered-content">
                        <div className="wrapper-login">
                            <div>
                                <h1 className="flex flex-center font-principal titulo-login">Login</h1>
                            </div>
                            <div>
                                <label className="font-descricao descricao-campo-login" for="email">E-mail:</label><br />
                                <input className="font-descricao campo-login" id="email" type="text" size="20" name="email" placeholder="Informe seu e-mail" value={this.state.email} onChange={(e) => this.preencherCampo(e, "email")} />
                            </div>
                            <div>
                                <label className="font-descricao descricao-campo-login" for="password"> Senha:</label><br />
                                <input className="font-descricao campo-login" id="password" type="password" size="20" name="password" placeholder="Informe sua palavra-passe" value={this.state.senha} onChange={(e) => this.preencherCampo(e, "senha")} />
                            </div>
                            <div className="flex flex-center divbotaoAcesso">
                                <button className="botaoAcesso" type="submit" onClick={this.validar}>Acessar</button>
                            </div>
                            <div className={`mensagem ${this.state.mensagem === "Acessado com sucesso!" ? "sucesso" : "erro"}`}>
                                {this.state.mensagem}
                            </div>
                        </div>
                    </div>
                </main >
            </div>
        )
    };
}
export default Login;