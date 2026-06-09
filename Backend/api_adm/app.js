/*************************************************************************************
 * Objetivo: Arquivo principal responsável pela criação da API Administrativa da Sorvetudos
 * Autor: Julio Augusto
 * data: 09/06/2026
 * versão: 1.0
 * *********************************************************************************/

/***************************************
    Dependencias para rodar o projeto:
        npm install express
        npm install cors
        npm install body-parser
        npm install mysql2
        npm install knex
 **************************************/

// IMPORT das dependências para criar a API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// IMPORT das funções das controllers
const {
    inserirNovoProduto,
    atualizarProduto,
    listarProduto,
    buscarProduto,
    excluirProduto
} = require('./controller/controller_produto/controller_produto.js')

const {
    inserirNovaCategoria,
    atualizarCategoria,
    listarCategoria,
    buscarCategoria,
    excluirCategoria
} = require('./controller/controller_categoria/controller_categoria.js')

const {
    inserirNovoIngrediente,
    atualizarIngrediente,
    listarIngrediente,
    buscarIngrediente,
    excluirIngrediente
} = require('./controller/controller_ingrediente/controller_ingrediente.js')

const {
    inserirNovoSabor,
    atualizarSabor,
    listarSabor,
    buscarSabor,
    excluirSabor
} = require('./controller/controller_sabor/controller_sabor.js')

const {
    inserirNovaTag,
    atualizarTag,
    listarTag,
    buscarTag,
    excluirTag
} = require('./controller/controller_tag/controller_tag.js')

const {
    inserirNovaPromocao,
    atualizarPromocao,
    listarPromocao,
    buscarPromocao,
    excluirPromocao
} = require('./controller/controller_promocao/controller_promocao.js')

const {
    inserirNovoLote,
    atualizarLote,
    listarLote,
    buscarLote,
    excluirLote
} = require('./controller/controller_lote/controller_lote.js')

const {
    inserirNovoUsuario,
    atualizarUsuario,
    listarUsuario,
    buscarUsuario,
    excluirUsuario
} = require('./controller/controller_usuario/controller_usuario.js')


// Criando um objeto para manipular o EXPRESS
const app = express()

// Porta onde a API esta rodando
const port = 8080

// Conjuntos de Permissões a serem aplicadas no CORS da API
const corsOptions = {
    origin: ['*'],
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: ['Content-type', 'Autorization']
}

// Criando um objeto para manipular dados do body da API em formato JSON
const bodyParserJSON = bodyParser.json()

// Configura as permissões da API através do CORS
app.use(cors(corsOptions))


// ****** ROTAS *********8
// Produtos
app.post('/v1/sorvetudos/admin/produtos', bodyParserJSON, async (req,res) => {
    let dados = req.body
    let contentType = req.headers['content-type']

    let result = await inserirNovoProduto(dados, contentType)
    res.status(result.status_code).json(result)
})

app.get('/v1/sorvetudos/admin/produtos', async (req,res) => {
    let result = await listarProduto()
    res.status(result.status_code).json(result)
})

app.get('/v1/sorvetudos/admin/produtos/:id', async (req,res) => {
    let id = req.params.id

    let result = await buscarProduto(id)
    res.status(result.status_code).json(result)
})

app.put('/v1/sorvetudos/admin/produtos/:id', bodyParserJSON, async (req,res) => {
    let id = req.params.id
    let dados = req.body
    let contentType = req.headers['content-type']

    let result = await atualizarProduto(dados, id, contentType)
    res.status(result.status_code).json(result)
})

app.delete('/v1/sorvetudos/admin/produtos/:id', async (req,res) => {
    let id = req.params.id

    let result = await excluirProduto(id)
    res.status(result.status_code).json(result)
})

// categorias
app.post('/v1/sorvetudos/admin/categorias', bodyParserJSON, async (req,res) => {
    let dados = req.body
    let contentType = req.headers['content-type']

    let result = await inserirNovaCategoria(dados, contentType)
    res.status(result.status_code).json(result)
})

app.get('/v1/sorvetudos/admin/categorias', async (req,res) => {
    let result = await listarCategoria()
    res.status(result.status_code).json(result)
})

app.get('/v1/sorvetudos/admin/categorias/:id', async (req,res) => {
    let id = req.params.id

    let result = await buscarCategoria(id)
    res.status(result.status_code).json(result)
})

app.put('/v1/sorvetudos/admin/categorias/:id', bodyParserJSON, async (req,res) => {
    let id = req.params.id
    let dados = req.body
    let contentType = req.headers['content-type']

    let result = await atualizarCategoria(dados, id, contentType)
    res.status(result.status_code).json(result)
})

app.delete('/v1/sorvetudos/admin/categorias/:id', async (req,res) => {
    let id = req.params.id

    let result = await excluirCategoria(id)
    res.status(result.status_code).json(result)
})


// Ingredientes
app.post('/v1/sorvetudos/admin/ingredientes', bodyParserJSON, async (req,res) => {
    let dados = req.body
    let contentType = req.headers['content-type']

    let result = await inserirNovoIngrediente(dados, contentType)
    res.status(result.status_code).json(result)
})

app.get('/v1/sorvetudos/admin/ingredientes', async (req,res) => {
    let result = await listarIngrediente()
    res.status(result.status_code).json(result)
})

app.get('/v1/sorvetudos/admin/ingredientes/:id', async (req,res) => {
    let id = req.params.id

    let result = await buscarIngrediente(id)
    res.status(result.status_code).json(result)
})

app.put('/v1/sorvetudos/admin/ingredientes/:id', bodyParserJSON, async (req,res) => {
    let id = req.params.id
    let dados = req.body
    let contentType = req.headers['content-type']

    let result = await atualizarIngrediente(dados, id, contentType)
    res.status(result.status_code).json(result)
})

app.delete('/v1/sorvetudos/admin/ingredientes/:id', async (req,res) => {
    let id = req.params.id

    let result = await excluirIngrediente(id)
    res.status(result.status_code).json(result)
})

// Sabores
app.post('/v1/sorvetudos/admin/sabores', bodyParserJSON, async (req,res) => {
    let dados = req.body
    let contentType = req.headers['content-type']

    let result = await inserirNovoSabor(dados, contentType)
    res.status(result.status_code).json(result)
})

app.get('/v1/sorvetudos/admin/sabores', async (req,res) => {
    let result = await listarSabor()
    res.status(result.status_code).json(result)
})

app.get('/v1/sorvetudos/admin/sabores/:id', async (req,res) => {
    let id = req.params.id

    let result = await buscarSabor(id)
    res.status(result.status_code).json(result)
})

app.put('/v1/sorvetudos/admin/sabores/:id', bodyParserJSON, async (req,res) => {
    let id = req.params.id
    let dados = req.body
    let contentType = req.headers['content-type']

    let result = await atualizarSabor(dados, id, contentType)
    res.status(result.status_code).json(result)
})

app.delete('/v1/sorvetudos/admin/sabores/:id', async (req,res) => {
    let id = req.params.id

    let result = await excluirSabor(id)
    res.status(result.status_code).json(result)
})

// Tags
app.post('/v1/sorvetudos/admin/tags', bodyParserJSON, async (req,res) => {
    let dados = req.body
    let contentType = req.headers['content-type']

    let result = await inserirNovaTag(dados, contentType)
    res.status(result.status_code).json(result)
})

app.get('/v1/sorvetudos/admin/tags', async (req,res) => {
    let result = await listarTag()
    res.status(result.status_code).json(result)
})

app.get('/v1/sorvetudos/admin/tags/:id', async (req,res) => {
    let id = req.params.id

    let result = await buscarTag(id)
    res.status(result.status_code).json(result)
})

app.put('/v1/sorvetudos/admin/tags/:id', bodyParserJSON, async (req,res) => {
    let id = req.params.id
    let dados = req.body
    let contentType = req.headers['content-type']

    let result = await atualizarTag(dados, id, contentType)
    res.status(result.status_code).json(result)
})

app.delete('/v1/sorvetudos/admin/tags/:id', async (req,res) => {
    let id = req.params.id

    let result = await excluirTag(id)
    res.status(result.status_code).json(result)
})

// Promoções
app.post('/v1/sorvetudos/admin/promocoes', bodyParserJSON, async (req,res) => {
    let dados = req.body
    let contentType = req.headers['content-type']

    let result = await inserirNovaPromocao(dados, contentType)
    res.status(result.status_code).json(result)
})

app.get('/v1/sorvetudos/admin/promocoes', async (req,res) => {
    let result = await listarPromocao()
    res.status(result.status_code).json(result)
})

app.get('/v1/sorvetudos/admin/promocoes/:id', async (req,res) => {
    let id = req.params.id

    let result = await buscarPromocao(id)
    res.status(result.status_code).json(result)
})

app.put('/v1/sorvetudos/admin/promocoes/:id', bodyParserJSON, async (req,res) => {
    let id = req.params.id
    let dados = req.body
    let contentType = req.headers['content-type']

    let result = await atualizarPromocao(dados, id, contentType)
    res.status(result.status_code).json(result)
})

app.delete('/v1/sorvetudos/admin/promocoes/:id', async (req,res) => {
    let id = req.params.id

    let result = await excluirPromocao(id)
    res.status(result.status_code).json(result)
})

// Lotes
app.post('/v1/sorvetudos/admin/lotes', bodyParserJSON, async (req,res) => {
    let dados = req.body
    let contentType = req.headers['content-type']

    let result = await inserirNovoLote(dados, contentType)
    res.status(result.status_code).json(result)
})

app.get('/v1/sorvetudos/admin/lotes', async (req,res) => {
    let result = await listarLote()
    res.status(result.status_code).json(result)
})

app.get('/v1/sorvetudos/admin/lotes/:id', async (req,res) => {
    let id = req.params.id

    let result = await buscarLote(id)
    res.status(result.status_code).json(result)
})

app.put('/v1/sorvetudos/admin/lotes/:id', bodyParserJSON, async (req,res) => {
    let id = req.params.id
    let dados = req.body
    let contentType = req.headers['content-type']

    let result = await atualizarLote(dados, id, contentType)
    res.status(result.status_code).json(result)
})

app.delete('/v1/sorvetudos/admin/lotes/:id', async (req,res) => {
    let id = req.params.id

    let result = await excluirLote(id)
    res.status(result.status_code).json(result)
})

// Usuarios
app.post('/v1/sorvetudos/admin/usuarios', bodyParserJSON, async (req,res) => {
    let dados = req.body
    let contentType = req.headers['content-type']

    let result = await inserirNovoUsuario(dados, contentType)
    res.status(result.status_code).json(result)
})

app.get('/v1/sorvetudos/admin/usuarios', async (req,res) => {
    let result = await listarUsuario()
    res.status(result.status_code).json(result)
})

app.get('/v1/sorvetudos/admin/usuarios/:id', async (req,res) => {
    let id = req.params.id

    let result = await buscarUsuario(id)
    res.status(result.status_code).json(result)
})

app.put('/v1/sorvetudos/admin/usuarios/:id', bodyParserJSON, async (req,res) => {
    let id = req.params.id
    let dados = req.body
    let contentType = req.headers['content-type']

    let result = await atualizarUsuario(dados, id, contentType)
    res.status(result.status_code).json(result)
})

app.delete('/v1/sorvetudos/admin/usuarios/:id', async (req,res) => {
    let id = req.params.id

    let result = await excluirUsuario(id)
    res.status(result.status_code).json(result)
})


// Iniciando o Servidor
app.listen(port, () => {
    console.log(`API Sorvetudos rodando em http://localhost:${port}`)
})