'use strict'

export const BASE_URL = 'https://backend-adm-sorvetudos.onrender.com/v1/sorvetudos/admin'

let token = localStorage.getItem('token')

function verificar401(res) {
  if (!res) return
  if (res.status == 401) {
    localStorage.removeItem('token')
    window.location.href = 'index.html'
    throw new Error('Não autorizado')
  }
}

export const getAllUsuarios = async () =>{
  

  const OPTIONS = {
    headers: {
      'x-access-token': token,
    },
  }

  let url = `${BASE_URL}/usuarios`
  try {
    let response = await fetch(url, OPTIONS)
    verificar401(response)
    if(!response.ok) throw new Error('Erro ao pegar usuarios')

    let data = await response.json()

    return data
  } catch (err) {
    console.error('Erro ao buscar users:', err)
    throw err
  }
}

export const getByIdUsuario = async (id) =>{
  

  const OPTIONS = {
    headers: {
      'x-access-token': token,
    },
  }

  let url = `${BASE_URL}/usuarios/${id}`

  try {
    let response = await fetch(url, OPTIONS)
    verificar401(response)
    let data = await response.json()

    return data
  } catch (err) {
    console.error('Erro ao buscar usuário por id:', err)
    throw err
  }
}

export const putByIdUsuario = async (usuario) =>{
    const OPTIONS = {
        headers: {
        'x-access-token': token,
        },
        method: 'PUT',
        body: JSON.stringify(usuario)
    }

    let url  = `${BASE_URL}/usuarios/${usuario.id}`

    try {
      let response = await fetch(url, OPTIONS)
      verificar401(response)
      let data = await response.json()

      return data
    } catch (err) {
      console.error('Erro ao atualizar usuário:', err)
      throw err
    }
}

export const deleteByIdUsuario = async (id) =>{
    const OPTIONS = {
        headers: {
        'x-access-token': token,
        },
        method: 'DELETE'
    }

    let url = `${BASE_URL}/usuarios/${id}`

    try {
      let response = await fetch(url, OPTIONS)
      verificar401(response)
      let data = await response.json()

      return data
    } catch (err) {
      console.error('Erro ao deletar usuário:', err)
      throw err
    }
} 

export const postUsuario = async (usuario) =>{
  const OPTIONS = {
    method: 'POST',
    headers: {
      'x-access-token': token,
    },
    body: JSON.stringify(usuario),
  } 


  try {
    let response = await fetch(`${BASE_URL}/usuarios`, OPTIONS)
    verificar401(response)

    let data = await response.json()
    return data
  } catch (err) {
    console.error('Erro ao criar usuário:', err)
    throw err
  }
}