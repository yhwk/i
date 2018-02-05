import {api, config} from './url'

const axios = config()

export async function login (data) {
  return axios.request({
    url: api.login,
    method: 'post',
    params: data
  })
}

export async function register (data) {
  return axios.request({
    url: api.register,
    method: 'post',
    data: data
  })
}

export async function getVcode (data) {
  return axios.request({
    url: api.getVcode,
    method: 'get',
    params: data
  })
}

export async function getUserInfo (token) {
  return axios.request({
    url: api.getUserInfo,
    method: 'get',
    headers: token
  })
}
