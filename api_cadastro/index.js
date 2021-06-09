const { Command } = require("commander");
const Commander = new Command();
const options = Commander.opts();
const Database = require('./database')
const Heroi = require('./heroi')


async function main() {
  Commander.version("v1")
    .option("-n, --nome [value]", "Nome do Heroi")
    .option("-p, --poder [value]", "Poder do Heroi")
    .option("-i, --id [value]", "ID do Heroi")
    .option("-c, --cadastrar", "Cadastrar um Heroi")
    .option("-l, --listar", "Listar um Heroi")
    .option("-r, --remover", "Remover um Heroi pelo id")
    .option("-a, --atualizar [value]", "Atualizar um Heroi pelo id")
  Commander.parse(process.argv);

  const heroi = new Heroi(options);
  try {
    if (options.cadastrar) {
      delete heroi.id
      const resultado = await Database.cadastrar(heroi)
      if (!resultado) { //!condição para tratar um resultado boolean
        console.error("Heroi não foi cadastrado")
        return;
      }
      console.log("Heroi foi cadastrado com sucesso!")
    }
    if (options.listar){
        const resultado = await Database.listar() 
        console.log(resultado)
        return;   
    }
    if (options.remover){
        const resultado = await Database.remover(heroi.id) 
        if(!resultado){
            console.log('Não foi possível remover o herói')
            return;
        }
        console.log('Herói removido com sucesso')
    }
    if(options.atualizar){
        const idParaAtualizar = parseInt(options.atualizar); //Depois da opção -a ou --atualizar o valor seguinte será o ID que queremos atualizar
        //remover todas as chaves que estiverem undefined || null
        const dado = JSON.stringify(heroi)
        const heroiAtualizar = JSON.parse(dado)
        const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar)
        if(!resultado){
            console.error('Não foi possível atualizar o herói')
            return;
        }
        console.log('Herói atualizado com sucesso')

    }
  } catch (error) {
    console.error("DEU RUIM!");
  }
}
main();
