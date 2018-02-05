import {api, config} from './url'

const axios = config()

export async function sendsms (data) {
  return axios.request({
    url: api.sendsms,
    method: 'get',
    params: data
  })
}
