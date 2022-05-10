const mysql = require('mysql');

module.exports = class CadastroProdutos {
    constructor(){
        this.conexao = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "crud_produtos"
        });
    }

    inserir(produto){
        this.conexao.connect();
        const sql = "INSERT INTO  produto (nome, preco) VALUES (?, ?)";
        this.conexao.query(sql, [produto.nome, produto.preco]);
        this.conexao.end();
    }
    //resultado é uma variável de callback(equivale a uma função)
    listar(resultado){
        this.conexao.connect();
        const sql = "SELECT * FROM produto";
        this.conexao.query(sql, function(err, res){
            if (err) {
                resultado(err, null);
            } else {
                let produtos = JSON.stringify(res);
                resultado(null, produtos);
            }
        });
        this.conexao.end();
    }
}