/*************************************************************************************
 * Objetivo: Arquivo responsável pelo gerenciamento de rotas de atividade
 * Data: 11/06/2026
 * Autor: Juan Carlos
 * Versão: 1.0.4.26
 * *********************************************************************************/

// import do express
const express = require('express')
const multer = require('multer') // upload de arquivos

// configuração para o multer enviar o arquivo de imagem
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    }
})

// instancia para criar um objeto com as caracteristicas do multer
const upload = multer()

// Cria um objeto de rota para o arquivo
const router = express.Router()

const bodyParser = require('body-parser')

// Criando um objeto para manipular dados do body da API em formato JSON
const bodyParserJSON = bodyParser.json()

const {
    buscarProdutoNome,
    listarProduto,
    buscarProduto,
    filtrarProduto
    
} = require('../controller/controller_produto/controller_produto.js')

// const formatarJson = async (dados) => {
//     const produto = {
//         nome        : dados.nome,
//         descricao   : dados.descricao,
//         preco       : Number(dados.preco),
//         status      : Number(dados.status),
//         tamanho     : dados.tamanho,
//         categoria   : JSON.parse(dados.categoria),
//         sabor       : JSON.parse(dados.sabor),
//         tag         : JSON.parse(dados.tag),
//         promocao    : JSON.parse(dados.promocao),
//         lote        : JSON.parse(dados.lote),
//         ingrediente : JSON.parse(dados.ingrediente)
//     }

//     return produto
// }

// Produtos


router.get('/', async (req,res) => {
    let result = await listarProduto()
    res.status(result.status_code).json(result)
})

router.get('/:id', async (req,res) => {
    let id = req.params.id

    let result = await buscarProduto(id)
    res.status(result.status_code).json(result)
})


router.get('/filtro', async (req,res) => {
    let filtro = req.query

    let result = await filtrarProduto(filtro)
    res.status(result.status_code).json(result)
})

router.get('/pesquisa', async (req,res) => {
    let nomeProduto = req.query.nome    
    let result = await buscarProdutoNome(nomeProduto)
    res.status(result.status_code).json(result)
})
module.exports = router