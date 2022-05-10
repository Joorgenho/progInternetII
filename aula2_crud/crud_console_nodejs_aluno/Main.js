const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const Produto = require("./Produto");
const readline = require('readline');
let arrProdutos = [];

// ---------- Create Server
const server = http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
});

// ---------- Server Listen
server.listen(port, hostname, () => {
    Header();
    CallMenu();
});

function CallMenu(){
  MenuMensagem();
  AskMenuNumber();
}

function Header(){
  console.log('\n')
  console.log(FgGreen+"                  ● CRUD Noje.JS ●                  ")
  console.log(FgWhite, "--------------------------------------------------\n")
  console.log(" Cadastro de Produtos: \n")
}

function MenuMensagem(){
    console.log(FgGreen, "» Create - 1")
    console.log(FgCyan, "» Update - 2")
    console.log(FgYellow, "» Read   - 3")
    console.log(FgMagenta, "» Delete - 4")
    console.log(FgWhite, "\n --------------------------------------------------")
};

function MenuSwitchCase(n){
    switch(n) {
        case 1:
            Create("CREATE", FgYellow+"Item adicionado "+Reset);
          break;
        case 2:
            Update();
          break;
        case 3:
            Read();
          break;
        case 4:
            Delete();
          break;
      }
};

function AskMenuNumber(){
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

    rl.question('\n', (input) => {
        rl.close();
        MenuSwitchCase(Number(input));
        });
}

  function Nome(cod, title, msg){
    Cl();
    console.log(FgGreen, "\n "+title+": ------------------------------------------\n"+Reset);
    const rl2 = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

  rl2.question('» Nome: \r', (input) => {
      rl2.close();
      Preco(cod, String(input), title, msg);
      });
  }

  function Preco(cod, nome, title, msg){
    Cl();
    console.log(FgGreen, "\n "+title+": ------------------------------------------\n"+Reset);
    const rl3 = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

  rl3.question('» Preço R$: \r', (input) => {
      var produto1 = new Produto(cod, nome, Number(input));
      rl3.close();
      arrProdutos.push(produto1)
      Cl();
      console.log("\n"+msg+" \n");
      console.log(ParserJson(arrProdutos[arrProdutos.length - 1]));
      console.log("\n\n MENU: --------------------------------------------\n");
      CallMenu();
      });
  }

  function ParserJson(obj){
    var arrayToString1 = JSON.stringify(Object.assign({}, obj));
    var object = JSON.parse(arrayToString1);
    return object;
  }

  // ------------------------------- CREATE
  function Create(title, msg){
    Cl();
    console.log(FgGreen, "\n "+title+": ------------------------------------------\n" +Reset);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

  rl.question('» Código: \r', (input) => {
      rl.close();
      Nome(Number(input), title, msg);
      });
  };

  // ------------------------------- UPDATE
  function Update(){
    Cl();
    console.log("\n");
    arrProdutos.forEach(EachPrint)
    console.log("\n UPDATE: ------------------------------------------\n");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

  rl.question('» Código do produto: \r', (input) => {
      rl.close();

      index = arrProdutos.findIndex(function( obj ) {
        if(obj.cod == Number(input)){
          Create("UPDATE", "Item atualizado.");
          return index;
        }
        else{
          Cl();
          console.log(FgYellow+"\nCódigo Inválido.");
          console.log(FgWhite, "\n--------------------------------------------------\n")
          return index;
        }
      });
      arrProdutos.splice(index, 0);
      console.log(arrProdutos)
        // arrProdutos = arrProdutos.filter(function( obj ) {
        //   if(obj.cod == Number(input)){
        //     Create("UPDATE", "Item atualizado.");
        //     return obj.cod !== Number(input);
        //   }
        //   else{
        //     Cl();
        //     console.log(FgYellow+"\nCódigo Inválido.");
        //     console.log(FgWhite, "\n--------------------------------------------------\n")
        //     return arrProdutos;
        //   }
        // });
      });
  };


  // ------------------------------- READ
  function Read(){
    Cl();
    if(arrProdutos.length == 0){
      console.log(Bright + "\n » Nenhum produto encontrado." + Reset)
    }
    else {
      console.log(FgYellow + "\nLista de itens totais:\n" + Reset)
      arrProdutos.forEach(EachPrint)
    }
    console.log("\n\n MENU: --------------------------------------------\n");
    CallMenu();
  };


  // ------------------------------- DELETE
  function Delete(){
    let x = arrProdutos.length;
    Cl();
    arrProdutos.forEach(EachPrint)
    console.log(Dim, "\nDELETE: ------------------------------------------\n");
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

    rl.question('» Digite o código do produto para deletar: \r', (input) => {
        rl.close();
          arrProdutos = arrProdutos.filter(function( obj ) {
            return obj.cod !== Number(input);
          });
            if(x == arrProdutos.length){
              Cl();
              console.log(FgYellow, ' Código inválido.');
              console.log(FgWhite, "\n--------------------------------------------------\n")
            }
            else{
              Cl();
              console.log(FgYellow + Bright + '\n Deletado.' + Reset);
              console.log(FgWhite, "\n--------------------------------------------------\n")
            }
          CallMenu();
        });
  };


  function EachPrint(index, item){
    console.log(index, item)
  }

  function Cl(){
    console.clear();
  }

Reset = "\x1b[0m"
Bright = "\x1b[1m"
Dim = "\x1b[2m"
Underscore = "\x1b[4m"
Blink = "\x1b[5m"
Reverse = "\x1b[7m"
Hidden = "\x1b[8m"

FgBlack = "\x1b[30m"
FgRed = "\x1b[31m"
FgGreen = "\x1b[32m"
FgYellow = "\x1b[33m"
FgBlue = "\x1b[34m"
FgMagenta = "\x1b[35m"
FgCyan = "\x1b[36m"
FgWhite = "\x1b[37m"

BgBlack = "\x1b[40m"
BgRed = "\x1b[41m"
BgGreen = "\x1b[42m"
BgYellow = "\x1b[43m"
BgBlue = "\x1b[44m"
BgMagenta = "\x1b[45m"
BgCyan = "\x1b[46m"
BgWhite = "\x1b[47m"

// »λ֎֍►>●842rw}êPR1åñ!Øÿ2! 