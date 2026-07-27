import http from '../axios' // WAJIB pakai instance

const anime = {
  getList: (params) => http.get('/anime', { params }),
  getById: (id) => http.get(`/anime/${id}`),
  getTop: (params) => http.get('/top/anime', { params }),
}

export default anime
