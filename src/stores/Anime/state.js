export default () => ({
  animeList: [],
  seasonalList: [],
  weeklySchedule: [],
  loading: false,
  seasonalPageInfo: null,
  animePageInfo: null,
  animeDetail: null,
  error: null,
  watchlist: JSON.parse(localStorage.getItem('watchlist') || '[]'),
})
