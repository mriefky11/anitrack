import http from '../axios'

const manga = {
  getTop: (params) => http.get('/top/manga', { params }),
}

export default manga
