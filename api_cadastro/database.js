const {
    readFile,
    writeFile
} = require('fs')

const {
    promisify
} = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

//const dadosJson = require('./herois.json')

class Database {

    constructor(){ //Método de inicialização de recursos - Utilizado sempre que uma nova instância é criada(No caso: "Database") - Permite que os recursos declarados possam ser utilizados por outros objetos da instância
        this.NOME_ARQUIVO = 'herois.json' //this informa que um objeto/método pertence a esta instância, logo um método estático não pode utilizar de objetos da instância
    }

    async obterDadosArquivo(){
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8')
        return JSON.parse(arquivo.toString())
    }

    async escreverArquivo(dados){
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
        return true
        
    }

   async cadastrar(heroi){
        const dados = await this.obterDadosArquivo()
        const id = heroi.id <= 2 ? heroi.id : Date.now(); //testar remover a primeira condição depois, logo depois remover o "delete heroi.id" do index

        const heroiComId = {
            id,
            ...heroi
        }
        const dadosFinal = [
            ...dados,
            heroiComId
        ]
        const resultado = await this.escreverArquivo(dadosFinal)
        return resultado;

    }
 
    async listar(id){ //Parâmetro id referente ao arquivo "herois.json"
        const dados = await this.obterDadosArquivo()
        const dadosFiltrados = dados.filter(item =>(id ? (item.id === id) : true)) //Caso seja passado um id, o return será apenas do item com id especificado; Caso não, trará tudo
        return dadosFiltrados //Retorno do dado "tratado"
    }

    async remover(id){
        if(!id){
            return await this.escreverArquivo([])
        }
        const dados = await this.obterDadosArquivo()
        const indice = dados.findIndex(item => item.id === parseInt(id))
        if (indice === -1){
            throw Error('O usuário informado não existe')
        }
        dados.splice(indice, 1)
        return await this.escreverArquivo(dados)
    }

    async atualizar(id, modificacoes){
        const dados = await this.obterDadosArquivo()
        const indice = dados.findIndex(item => item.id === parseInt(id))
        if (indice === -1){
            throw Error('O heroi informado não existe')
        }
        const atual = dados[indice]
        const objetoAtualizado ={
            ...atual,
            ...modificacoes
        }
        dados.splice(indice, 1)

        return await this.escreverArquivo([
            ...dados,
            objetoAtualizado
        ])

    }
}
module.exports = new Database()