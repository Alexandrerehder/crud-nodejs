const {
    deepStrictEqual, //
    ok
} = require('assert')

const database = require('./database')//Importação database.js para trabalhar com todos os objetos criados

const DEFAULT_ITEM_CADASTRAR = { 
    nome: 'Flash',
    poder: 'Speed',
    id: 1
}

const DEFAULT_ITEM_ATUALIZAR = { 
    nome: 'Lanter Verde',
    poder: 'Anel',
    id: 2
}

describe('Suite de manipulação de Heróis', () => { //Função que define a inicialização da suite de testes
    before(async () => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)
})
    it('deve pesquisar um heroi, usando arquivos', async () => { //Função que define o objetivo do teste
        const expected = DEFAULT_ITEM_CADASTRAR
        const [resultado] = await database.listar(expected.id) //Ex: [resultado, resultado1, resultado2]

        deepStrictEqual(resultado, expected) //Valida se temos a saída correta de acordo com o objetivo do teste
    })
    
    it('deve cadastrar um heroi, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id)

        deepStrictEqual(actual, expected)

    })
    it('deve remover um heroi por id', async () => {
        const expected = true;
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id)

        deepStrictEqual(resultado, expected)
    })
    it('deve atualizar um heroi por id', async () => {
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome: 'Batman',
            poder: 'Dinheiro'
        }
        const novoDado = {
            nome: 'Batman',
            poder: 'Dinheiro'
        }
        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado)
        const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)
    
        deepStrictEqual(resultado, expected)
})
})
    
    

