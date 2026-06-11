/*************************************************************************************
 * Objetivo: Arquivo responsável pelo gerenciamento de rotas de atividade
 * Data: 11/06/2026
 * Autor: Juan Carlos
 * Versão: 1.0.4.26
 * *********************************************************************************/

// import do express
const express = require('express')

// Cria um objeto de rota para o arquivo
const router = express.Router()

const bodyParser = require('body-parser')

// Criando um objeto para manipular dados do body da API em formato JSON
const bodyParserJSON = bodyParser.json()

const {
    listarPromocao,
    buscarPromocao
} = require('../controller/controller_promocao/controller_promocao.js')

// Promoções


router.get('/', async (req,res) => {
    let result = await listarPromocao()
    res.status(result.status_code).json(result)
})

router.get('/:id', async (req,res) => {
    let id = req.params.id

    let result = await buscarPromocao(id)
    res.status(result.status_code).json(result)
})



module.exports = router