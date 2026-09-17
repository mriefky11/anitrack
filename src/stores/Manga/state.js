export default () => ({
  mangaList: [],
  loading: false,
  mangaDetail: null,
  error: null,
  readlist: JSON.parse(localStorage.getItem('readlist') || '[]'),
})
