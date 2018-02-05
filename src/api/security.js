import {api, config} from './url'

const axios = config()

export async function findPassword (data) {
  return axios.request({
    url: api.findPassword,
    method: 'post',
    params: data
  })
}

export async function setPayPassword (data, token) {
  return axios.request({
    url: api.setPayPassword,
    method: 'post',
    params: data,
    headers: token
  })
}

export async function changePhoneOrEmailStep1 (data, token) {
  return axios.request({
    url: api.changePhoneOrEmailStep1,
    method: 'post',
    params: data,
    headers: token
  })
}

export async function changePhoneOrEmailStep2 (data, token) {
  return axios.request({
    url: api.changePhoneOrEmailStep2,
    method: 'post',
    params: data,
    headers: token
  })
}

export async function authentication (data, token) {
  return axios.request({
    url: api.authentication,
    method: 'post',
    params: data,
    headers: token
  })
}
