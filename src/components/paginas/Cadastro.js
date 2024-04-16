import React, { Component} from "react";
import { Link } from "react-router-dom";
import firebase from '../Firebase';

class Cadastro extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nome: "",
            sobrenome: "",
            dataNascimento: "",
            email: "",
            senha: ""

        };
        this.gravar = this.gravar.bind(this);
    }

    /*async para nao travar a aplicação, devido o uso de serviço/aplicação externa*/
    async gravar() {
        
        /*await nao continua o código antes de terminar, o processo desta função*/ 
        await firebase.firestore().collection("usuario").add({
            nome: this.state.nome,
            sobrenome: this.state.sobrenome,
            dataNascimento: this.state.dataNascimento,
            email:this.state.email,
            senha:this.state.senha
        });
    }


    render() {
        return (
            <div>
                 <h1>Página de Cadastro</h1>
                <input type="text" className="campo" id="campoNome" size="20" placeholder="Insira o primeiro nome" onChange={(e) => this.setState({ nome: e.target.value })} />
                <button onClick={this.gravar}>Gravar</button>
            </div>
        )

    }
}
export default Cadastro;