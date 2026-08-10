import http from '../axios'

const character = {
  getTop: (params) => http.get('/top/characters', { params }),
}

export default character
