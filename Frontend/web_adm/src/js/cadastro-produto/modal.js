// --- CATEGORIA ---
const btnDeletarCategoria = document.querySelector('[aria-label = "Deletar categoria"]')
const btnAdicionarCategoria = document.querySelector('[aria-label = "Adicionar categoria"]')
const btnEditarCategoria = document.querySelector('[aria-label = "Editar categoria"]')

// --- SABOR ---
const btnDeletarSabor = document.querySelector('[aria-label = "Deletar sabor"]')
const btnAdicionarSabor = document.querySelector('[aria-label = "Adicionar sabor"]')
const btnEditarSabor = document.querySelector('[aria-label = "Editar sabor"]')

// --- TAG ---
const btnDeletarTag = document.querySelector('[aria-label = "Deletar tag"]')
const btnAdicionarTag = document.querySelector('[aria-label = "Adicionar tag"]')
const btnEditarTag = document.querySelector('[aria-label = "Editar tag"]')

// --- TAMANHO ---
const btnDeletarTamanho = document.querySelector('[aria-label = "Deletar tamanho"]')
const btnAdicionarTamanho = document.querySelector('[aria-label = "Adicionar tamanho"]')
const btnEditarTamanho = document.querySelector('[aria-label = "Editar tamanho"]')

// --- INGREDIENTE ---
const btnDeletarIngrediente = document.querySelector('[aria-label = "Deletar ingrediente"]')
const btnAdicionarIngrediente = document.querySelector('[aria-label = "Adicionar ingrediente"]')
const btnEditarIngrediente = document.querySelector('[aria-label = "Editar ingrediente"]')

//Renders
import { BASE_URL, CATEGORIAS } from "./main.js";
import { renderizarCategorias } from "./renderizar.js"
import { renderizarIngredientes } from "./renderizar.js"
import { renderizarSabores } from "./renderizar.js"
import { renderizarTags } from "./renderizar.js"
import { renderizarTamanhos } from "./renderizar.js"

let token = localStorage.getItem('token')

function verificar401(res) {
  if (!res) return
  if (res.status == 401) {
    localStorage.removeItem('token')
    window.location.href = 'index.html'
    throw new Error('Não autorizado')
  }
}

function obterSelecionados(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return [];
  return Array.from(
    container.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked')
  ).map((cb) => ({ id: Number(cb.value), label: cb.dataset.label }));
}

function proximoId(array) {
  return array.length > 0 ? Math.max(...array.map((x) => x.id)) + 1 : 1;
}

//  Motor do modal
function abrirModal(html) {
  const overlay = document.getElementById("modal-overlay");
  const caixa   = document.getElementById("modal-caixa");
  caixa.innerHTML = html;
  overlay.classList.add("ativo");

  const btnFechar = caixa.querySelector(".modal-fechar");
  if (btnFechar) btnFechar.addEventListener("click", fecharModal);

  // Fechar ao clicar fora
  overlay.addEventListener("click", _fecharFora);
}

function _fecharFora(e) {
  if (e.target === document.getElementById("modal-overlay")) {
    fecharModal();
  }
}

function fecharModal() {
  const overlay = document.getElementById("modal-overlay");
  overlay.classList.remove("ativo");
  overlay.removeEventListener("click", _fecharFora);
}

//  Template base dos modais
function _modalFormulario({ titulo, labelCampo, placeholder, valorInicial = "", textoBotao, aoConfirmar }) {
  abrirModal(`
    <button class="modal-fechar" aria-label="Fechar">✕</button>
    <h2 class="modal-titulo">${titulo}</h2>
    <div class="modal-corpo">
      <label class="campo-label">${labelCampo}</label>
      <input id="modal-input" class="campo-input" type="text"
             placeholder="${placeholder}" value="${valorInicial}" />
    </div>
    <div class="modal-rodape">
      <button class="btn-acao btn-confirmar" id="modal-btn-confirmar">${textoBotao}</button>
    </div>
  `);
  document.getElementById("modal-btn-confirmar").addEventListener("click", aoConfirmar);
  // Confirmar com Enter
  document.getElementById("modal-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") aoConfirmar();
  });
}

function _modalConfirmacao({ titulo, mensagem, aoConfirmar }) {
  abrirModal(`
    <button class="modal-fechar" aria-label="Fechar">✕</button>
    <h2 class="modal-titulo">${titulo}</h2>
    <div class="modal-corpo modal-corpo--confirmar">
      <p class="texto-confirmar">${mensagem}</p>
    </div>
    <div class="modal-rodape modal-rodape--dois">
      <button class="btn-acao btn-perigo" id="modal-btn-deletar">deletar</button>
      <button class="btn-acao btn-secundario" id="modal-btn-voltar">voltar</button>
    </div>
  `);

  document.getElementById("modal-btn-deletar").addEventListener("click", aoConfirmar);
  document.getElementById("modal-btn-voltar").addEventListener("click", fecharModal);
}


//  CATEGORIAS
function modalAdicionarCategoria() {
  _modalFormulario({
    titulo:       "Nova Categoria",
    labelCampo:   "Nome da Categoria",
    placeholder:  "EX: Cremosos",
    textoBotao:   "CADASTRAR CATEGORIA",
    aoConfirmar:  _confirmarAdicionarCategoria,
  });
}

const _confirmarAdicionarCategoria = async () => {
  let valor = document.getElementById("modal-input").value.trim();
  if (!valor) return alert("Informe o nome da categoria.");

  let categoria = {
    "categoria" : valor
  }
  
  const OPTIONS = {
      method: 'POST',
      headers: {
          'Content-Type':'application/json',
          'x-access-token': token
      },
      body: JSON.stringify(categoria)   
  }

  try {
    let response = await fetch(`${BASE_URL}/categorias`, OPTIONS)
    verificar401(response)
    if(!response || !response.ok) throw new Error ('Erro a criar uma nova categoria')

    renderizarCategorias();
    fecharModal();
  } catch (err) {
    console.error('Erro adicionar categoria:', err)
    alert('Erro ao criar categoria. Tente novamente.')
  }
}

function modalEditarCategoria() {
  let sel = obterSelecionados("categorias-chips");

  if (sel.length === 0) return alert("Selecione uma categoria para editar.");
  if (sel.length > 1)   return alert("Não é possível atualizar múltiplos itens ao mesmo tempo.");

  let item = sel[0];
  _modalFormulario({
    titulo:        "Editar Categoria",
    labelCampo:    "Nome da Categoria",
    placeholder:   "EX: Cremosos",
    valorInicial:  item.label,
    textoBotao:    "EDITAR CATEGORIA",
    aoConfirmar:   () => _confirmarEditarCategoria(item.id),
  });
}

const _confirmarEditarCategoria = async (id) => {
  let valor = document.getElementById("modal-input").value.trim();
  if (!valor) return alert("Informe o nome da categoria.");

    let categoria = {
    "categoria" : valor
  }
  
  const OPTIONS = {
      method: 'PUT',
      headers: {
          'Content-Type':'application/json',
          'x-access-token': token
      },
      body: JSON.stringify(categoria)   
  }

  try {
    let response = await fetch(`${BASE_URL}/categorias/${id}`, OPTIONS)
    verificar401(response)
    if(!response || !response.ok) throw new Error ('Erro ao editar categoria')

    renderizarCategorias();
    fecharModal();
  } catch (err) {
    console.error('Erro editar categoria:', err)
    alert('Erro ao editar categoria. Tente novamente.')
  }
}

function modalDeletarCategoria() {
  let sel = obterSelecionados("categorias-chips");
  if (sel.length === 0) return alert("Selecione ao menos uma categoria para deletar.");

  _modalConfirmacao({
    titulo:      "Deletar Categoria",
    mensagem:    `Deseja deletar ${sel.length} categoria(s)?`,
    aoConfirmar: () => _confirmarDeletarCategoria(sel.map((s) => s.id)),
  });
}

const _confirmarDeletarCategoria = async (ids) => {
  const OPTIONS = {
      method: 'DELETE',
      headers: {
          'Content-Type':'application/json',
          'x-access-token': token
      }
    }

  try {
    const responses = await Promise.all(
      ids.map((id) => fetch(`${BASE_URL}/categorias/${id}`, OPTIONS))
    );
    responses.forEach(verificar401)
    if (!responses.every(r => r.ok)) throw new Error('Erro ao deletar uma ou mais categorias')

    renderizarCategorias();
    fecharModal();
  } catch (err) {
    console.error('Erro deletar categorias:', err)
    alert('Erro ao deletar categorias. Tente novamente.')
  }
}

//  TAGS
function modalAdicionarTag() {
  _modalFormulario({
    titulo:      "Nova Tag",
    labelCampo:  "Nome da Tag",
    placeholder: "EX: Em Alta",
    textoBotao:  "CADASTRAR TAG",
    aoConfirmar: _confirmarAdicionarTag,
  });
}

const _confirmarAdicionarTag = async () => {
  const valor = document.getElementById("modal-input").value.trim();
  if (!valor) return alert("Informe o nome da tag.");
  
  let tag = {
    "tag" : valor
  }
  
  const OPTIONS = {
      method: 'POST',
      headers: {
          'Content-Type':'application/json',
          'x-access-token': token
      },
      body: JSON.stringify(tag)   
  }

  try {
    let response = await fetch(`${BASE_URL}/tags`, OPTIONS)
    verificar401(response)
    if(!response || !response.ok) throw new Error ('Erro a criar uma nova tag')

    renderizarTags();
    fecharModal();
  } catch (err) {
    console.error('Erro adicionar tag:', err)
    alert('Erro ao criar tag. Tente novamente.')
  }
}

function modalEditarTag() {
  const sel = obterSelecionados("tags-chips");
  if (sel.length === 0) return alert("Selecione uma tag para editar.");
  if (sel.length > 1)   return alert("Não é possível atualizar múltiplos itens ao mesmo tempo.");

  const item = sel[0];
  _modalFormulario({
    titulo:       "Editar Tag",
    labelCampo:   "Nome da Tag",
    placeholder:  "EX: Em Alta",
    valorInicial: item.label,
    textoBotao:   "EDITAR TAG",
    aoConfirmar:  () => _confirmarEditarTag(item.id),
  });
}

const _confirmarEditarTag = async (id) => {
  const valor = document.getElementById("modal-input").value.trim();
  if (!valor) return alert("Informe o nome da tag.");

  let tag = {
    "tag" : valor
  }

  const OPTIONS = {
      method: 'PUT',
      headers: {
          'Content-Type':'application/json',
          'x-access-token': token
      },
      body: JSON.stringify(tag)   
  }

  try {
    let response = await fetch(`${BASE_URL}/tags/${id}`, OPTIONS)
    verificar401(response)
    if(!response || !response.ok) throw new Error ('Erro ao editar tag')

    renderizarTags();
    fecharModal();
  } catch (err) {
    console.error('Erro editar tag:', err)
    alert('Erro ao editar tag. Tente novamente.')
  }
}

function modalDeletarTag() {
  const sel = obterSelecionados("tags-chips");
  if (sel.length === 0) return alert("Selecione ao menos uma tag para deletar.");

  _modalConfirmacao({
    titulo:      "Deletar Tag",
    mensagem:    `Deseja deletar ${sel.length} tag(s)?`,
    aoConfirmar: () => _confirmarDeletarTag(sel.map((s) => s.id)),
  });
}

const _confirmarDeletarTag = async (ids) => {
  const OPTIONS = {
      method: 'DELETE',
      headers: {
          'Content-Type':'application/json',
          'x-access-token': token
      }
    }

  try {
    const responses = await Promise.all(
      ids.map((id) => fetch(`${BASE_URL}/tags/${id}`, OPTIONS))
    );
    responses.forEach(verificar401)
    if (!responses.every(r => r.ok)) throw new Error('Erro ao deletar uma ou mais tags')

    renderizarTags();
    fecharModal();
  } catch (err) {
    console.error('Erro deletar tags:', err)
    alert('Erro ao deletar tags. Tente novamente.')
  }
}

//  SABORES
function modalAdicionarSabor() {
  _modalFormulario({
    titulo:      "Novo Sabor",
    labelCampo:  "Nome do Sabor",
    placeholder: "EX: Chocolate Premium",
    textoBotao:  "CADASTRAR SABOR",
    aoConfirmar: _confirmarAdicionarSabor,
  });
}

const _confirmarAdicionarSabor = async () => {
  const valor = document.getElementById("modal-input").value.trim();
  if (!valor) return alert("Informe o nome do sabor.");

  let sabor = {
    "sabor" : valor
  }
  
  const OPTIONS = {
      method: 'POST',
      headers: {
          'Content-Type':'application/json',
          'x-access-token': token
      },
      body: JSON.stringify(sabor)   
  }

  try {
    let response = await fetch(`${BASE_URL}/sabores`, OPTIONS)
    verificar401(response)
    if(!response || !response.ok) throw new Error ('Erro a criar um novo sabor')

    renderizarSabores();
    fecharModal();
  } catch (err) {
    console.error('Erro adicionar sabor:', err)
    alert('Erro ao criar sabor. Tente novamente.')
  }
}

function modalEditarSabor() {
  const sel = obterSelecionados("sabores-chips");
  if (sel.length === 0) return alert("Selecione um sabor para editar.");
  if (sel.length > 1)   return alert("Não é possível atualizar múltiplos itens ao mesmo tempo.");

  const item = sel[0];
  _modalFormulario({
    titulo:       "Editar Sabor",
    labelCampo:   "Nome do Sabor",
    placeholder:  "EX: Chocolate Premium",
    valorInicial: item.label,
    textoBotao:   "EDITAR SABOR",
    aoConfirmar:  () => _confirmarEditarSabor(item.id),
  });
}

const _confirmarEditarSabor= async (id) => {
  const valor = document.getElementById("modal-input").value.trim();
  if (!valor) return alert("Informe o nome do sabor.");
  
  let sabor = {
    "sabor" : valor
  }

  const OPTIONS = {
      method: 'PUT',
      headers: {
          'Content-Type':'application/json',
          'x-access-token': token
      },
      body: JSON.stringify(sabor)   
  }

  try {
    let response = await fetch(`${BASE_URL}/sabores/${id}`, OPTIONS)
    verificar401(response)
    if(!response || !response.ok) throw new Error ('Erro ao editar sabor')

    renderizarSabores();
    fecharModal();
  } catch (err) {
    console.error('Erro editar sabor:', err)
    alert('Erro ao editar sabor. Tente novamente.')
  }
}

function modalDeletarSabor() {
  const sel = obterSelecionados("sabores-chips");
  if (sel.length === 0) return alert("Selecione ao menos um sabor para deletar.");

  _modalConfirmacao({
    titulo:      "Deletar Sabor",
    mensagem:    `Deseja deletar ${sel.length} sabor(es)?`,
    aoConfirmar: () => _confirmarDeletarSabor(sel.map((s) => s.id)),
  });
}

const _confirmarDeletarSabor = async (ids) => {
  const OPTIONS = {
      method: 'DELETE',
      headers: {
          'Content-Type':'application/json',
          'x-access-token': token
      }
    }

  try {
    const responses = await Promise.all(
      ids.map((id) => fetch(`${BASE_URL}/sabores/${id}`, OPTIONS))
    );
    responses.forEach(verificar401)
    if (!responses.every(r => r.ok)) throw new Error('Erro ao deletar um ou mais sabores')
    renderizarSabores();
    fecharModal();
  } catch (err) {
    console.error('Erro deletar sabores:', err)
    alert('Erro ao deletar sabores. Tente novamente.')
  }
}

//  TAMANHOS

function modalAdicionarTamanho() {
  _modalFormulario({
    titulo:      "Novo Tamanho",
    labelCampo:  "Nome do Tamanho",
    placeholder: "EX: G",
    textoBotao:  "CADASTRAR TAMANHO",
    aoConfirmar: _confirmarAdicionarTamanho,
  });
}

const _confirmarAdicionarTamanho = async () => {
  const valor = document.getElementById("modal-input").value.trim();
  if (!valor) return alert("Informe o tamanho.");
  let tamanho = {
    "tamanho" : valor
  }
  
  const OPTIONS = {
      method: 'POST',
      headers: {
          'Content-Type':'application/json',
          'x-access-token': token
      },
      body: JSON.stringify(tamanho)   
  }

  try {
    let response = await fetch(`${BASE_URL}/tamanhos`, OPTIONS)
    verificar401(response)
    if(!response || !response.ok) throw new Error ('Erro a criar um novo tamanho')
    renderizarTamanhos();
    fecharModal();
  } catch (err) {
    console.error('Erro adicionar tamanho:', err)
    alert('Erro ao criar tamanho. Tente novamente.')
  }
}

function modalEditarTamanho() {
  const sel = obterSelecionados("tamanhos-chips");
  if (sel.length === 0) return alert("Selecione um tamanho para editar.");
  if (sel.length > 1)   return alert("Não é possível atualizar múltiplos itens ao mesmo tempo.");

  const item = sel[0];
  _modalFormulario({
    titulo:       "Editar Tamanho",
    labelCampo:   "Nome do Tamanho",
    placeholder:  "EX: G",
    valorInicial: item.label,
    textoBotao:   "EDITAR TAMANHO",
    aoConfirmar:  () => _confirmarEditarTamanho(item.id),
  });
}

const _confirmarEditarTamanho = async (id) => {
  const valor = document.getElementById("modal-input").value.trim();
  if (!valor) return alert("Informe o tamanho.");

  let tamanho = {
    "tamanho" : valor
  }

  const OPTIONS = {
      method: 'PUT',
      headers: {
          'Content-Type':'application/json',
          'x-access-token': token
      },
      body: JSON.stringify(tamanho)   
  }

  try {
    let response = await fetch(`${BASE_URL}/tamanhos/${id}`, OPTIONS)
    verificar401(response)
    if(!response || !response.ok) throw new Error ('Erro ao editar tamanho')

    renderizarTamanhos();
    fecharModal();
  } catch (err) {
    console.error('Erro editar tamanho:', err)
    alert('Erro ao editar tamanho. Tente novamente.')
  }
}

function modalDeletarTamanho() {
  const sel = obterSelecionados("tamanhos-chips");
  if (sel.length === 0) return alert("Selecione ao menos um tamanho para deletar.");

  _modalConfirmacao({
    titulo:      "Deletar Tamanho",
    mensagem:    `Deseja deletar ${sel.length} tamanho(s)?`,
    aoConfirmar: () => _confirmarDeletarTamanho(sel.map((s) => s.id)),
  });
}

const _confirmarDeletarTamanho = async (ids) => {
  const OPTIONS = {
      method: 'DELETE',
      headers: {
          'Content-Type':'application/json',
          'x-access-token': token
      }
    }

  try {
    const responses = await Promise.all(
      ids.map((id) => fetch(`${BASE_URL}/tamanhos/${id}`, OPTIONS))
    );
    responses.forEach(verificar401)
    if (!responses.every(r => r.ok)) throw new Error('Erro ao deletar um ou mais tamanhos')

    renderizarTamanhos();
    fecharModal();
  } catch (err) {
    console.error('Erro deletar tamanhos:', err)
    alert('Erro ao deletar tamanhos. Tente novamente.')
  }
}

//  INGREDIENTES
function modalAdicionarIngrediente() {
  _modalFormulario({
    titulo:      "Novo Ingrediente",
    labelCampo:  "Nome do Ingrediente",
    placeholder: "EX: Leite integral",
    textoBotao:  "CADASTRAR INGREDIENTE",
    aoConfirmar: _confirmarAdicionarIngrediente,
  });
}

const _confirmarAdicionarIngrediente = async () => {
  const valor = document.getElementById("modal-input").value.trim();
  if (!valor) return alert("Informe o nome do ingrediente.");

  let ingrediente = {
    "ingrediente" : valor
  }
  
  const OPTIONS = {
      method: 'POST',
      headers: {
          'Content-Type':'application/json',
          'x-access-token': token
      },
      body: JSON.stringify(ingrediente)   
  }

  try {
    let response = await fetch(`${BASE_URL}/ingredientes`, OPTIONS)
    verificar401(response)
    if(!response || !response.ok) throw new Error ('Erro a criar um novo ingrediente')
    renderizarIngredientes();
    fecharModal();
  } catch (err) {
    console.error('Erro adicionar ingrediente:', err)
    alert('Erro ao criar ingrediente. Tente novamente.')
  }
}

function modalEditarIngrediente() {
  const sel = obterSelecionados("ingredientes-chips");
  if (sel.length === 0) return alert("Selecione um ingrediente para editar.");
  if (sel.length > 1)   return alert("Não é possível atualizar múltiplos itens ao mesmo tempo.");

  const item = sel[0];
  _modalFormulario({
    titulo:       "Editar Ingrediente",
    labelCampo:   "Nome do Ingrediente",
    placeholder:  "EX: Leite integral",
    valorInicial: item.label,
    textoBotao:   "EDITAR INGREDIENTE",
    aoConfirmar:  () => _confirmarEditarIngrediente(item.id),
  });
}

const _confirmarEditarIngrediente = async (id) => {
  const valor = document.getElementById("modal-input").value.trim();
  if (!valor) return alert("Informe o nome do ingrediente.");
  
  let ingrediente = {
    "ingrediente" : valor
  }

  const OPTIONS = {
      method: 'PUT',
      headers: {
          'Content-Type':'application/json',
          'x-access-token': token
      },
      body: JSON.stringify(ingrediente)   
  }

  try {
    let response = await fetch(`${BASE_URL}/ingredientes/${id}`, OPTIONS)
    verificar401(response)
    if(!response || !response.ok) throw new Error ('Erro ao editar ingrediente')
    renderizarIngredientes();
    fecharModal();
  } catch (err) {
    console.error('Erro editar ingrediente:', err)
    alert('Erro ao editar ingrediente. Tente novamente.')
  }
}

function modalDeletarIngrediente() {
  const sel = obterSelecionados("ingredientes-chips");
  if (sel.length === 0) return alert("Selecione ao menos um ingrediente para deletar.");

  _modalConfirmacao({
    titulo:      "Deletar Ingrediente",
    mensagem:    `Deseja deletar ${sel.length} ingrediente(s)?`,
    aoConfirmar: () => _confirmarDeletarIngrediente(sel.map((s) => s.id)),
  });
}

const _confirmarDeletarIngrediente = async (ids) => {
  const OPTIONS = {
      method: 'DELETE',
      headers: {
          'Content-Type':'application/json',
          'x-access-token': token
      }
    }

  try {
    const responses = await Promise.all(
      ids.map((id) => fetch(`${BASE_URL}/ingredientes/${id}`, OPTIONS))
    );
    responses.forEach(verificar401)
    if (!responses.every(r => r.ok)) throw new Error('Erro ao deletar um ou mais ingredientes')

    renderizarIngredientes();
    fecharModal();
  } catch (err) {
    console.error('Erro deletar ingredientes:', err)
    alert('Erro ao deletar ingredientes. Tente novamente.')
  }
}

// EVENTOS
btnDeletarCategoria.addEventListener('click', modalDeletarCategoria)
btnAdicionarCategoria.addEventListener('click', modalAdicionarCategoria)
btnEditarCategoria.addEventListener('click', modalEditarCategoria)

btnDeletarSabor.addEventListener('click', modalDeletarSabor)
btnAdicionarSabor.addEventListener('click', modalAdicionarSabor)
btnEditarSabor.addEventListener('click', modalEditarSabor)

btnDeletarTag.addEventListener('click', modalDeletarTag)
btnAdicionarTag.addEventListener('click', modalAdicionarTag)
btnEditarTag.addEventListener('click', modalEditarTag)

btnDeletarTamanho.addEventListener('click', modalDeletarTamanho)
btnAdicionarTamanho.addEventListener('click', modalAdicionarTamanho)
btnEditarTamanho.addEventListener('click', modalEditarTamanho)

btnDeletarIngrediente.addEventListener('click', modalDeletarIngrediente)
btnAdicionarIngrediente.addEventListener('click', modalAdicionarIngrediente)
btnEditarIngrediente.addEventListener('click', modalEditarIngrediente)