export default {
  topRatedAnime: (state) => {
    return state.animeList.filter((anime) => anime.score >= 8)
  },
}
