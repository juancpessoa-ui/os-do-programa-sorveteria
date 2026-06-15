/*************************************************************************************
 * Objetivo: Arquivo responsável pelo gerenciamento de rotas de atividade
  * Autor: Juan Carlos
 * data: 11/06/2026
 * versão: 1.0
 * *********************************************************************************/

// import do express
const express = require('express')

// Cria um objeto de rota para o arquivo
const router = express.Router()

const bodyParser = require('body-parser')

// Criando um objeto para manipular dados do body da API em formato JSON
const bodyParserJSON = bodyParser.json()

const {
    inserirNovaCategoria,
    atualizarCategoria,
    listarCategoria,
    buscarCategoria,
    excluirCategoria
} = require('../controller/categoria/controller_categoria.js')

// categorias
router.post('/', bodyParserJSON, async (req,res) => {
    let dados = req.body
    let contentType = req.headers['content-type']

    let result = await inserirNovaCategoria(dados, contentType)
    res.status(result.status_code).json(result)
})

router.get('/', async (req,res) => {
    let result = await listarCategoria()
    res.status(result.status_code).json(result)
})

router.get('/:id', async (req,res) => {
    let id = req.params.id

    let result = await buscarCategoria(id)
    res.status(result.status_code).json(result)
})

router.put('/:id', bodyParserJSON, async (req,res) => {
    let id = req.params.id
    let dados = req.body
    let contentType = req.headers['content-type']

    let result = await atualizarCategoria(dados, id, contentType)
    res.status(result.status_code).json(result)
})

router.delete('/:id', async (req,res) => {
    let id = req.params.id

    let result = await excluirCategoria(id)
    res.status(result.status_code).json(result)
})

module.exports = router