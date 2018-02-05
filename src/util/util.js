export default {
  setCookie (name, value, day) {
    let exp = new Date()
    exp.setTime(exp.getTime() + day * 24 * 60 * 60 * 1000)
    day ? exp = exp.toGMTString() : exp = 'Session'
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${exp};domain=zhifangw.cn`
    // document.cookie = `${name}=${encodeURIComponent(value)};expires=${exp};path=null`
  },
  getCookie (name) {
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    let arr = document.cookie.match(reg)
    if (arr) {
      return decodeURIComponent(arr[2])
    } else {
      return null
    }
  },
  delCookie (name) {
    this.setCookie(name, '', -1)
  },
  getUrlSearch (name) {
    let query = location.search
    if (query) {
      query = query.substring(1)
      let arr = query.split('&')
      console.log(arr)
      for (let param of arr) {
        console.log(param)
        if (param.toString().split('=')[0] === name) {
          return decodeURIComponent(param.toString().split('=')[1])
        }
      }
      return null
    }
  },
  getHashSearch (name) {
    let query = location.hash.split('?')[1]
    if (query) {
      let arr = query.split('&')
      for (let param of arr) {
        if (param.toString().split('=')[0] === name) {
          return decodeURIComponent(param.toString().split('=')[1])
        }
      }
      return null
    }
  }
}
