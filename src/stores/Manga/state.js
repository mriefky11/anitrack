export default () => ({
  mangaList: [],
  loading: false,
  mangaDetail: null,
  mangaPageInfo: null,
  error: null,
  readlist: JSON.parse(localStorage.getItem('readlist') || '[]'),
})
