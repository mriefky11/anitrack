import { gql } from '../axios.js'

const MEDIA_FIELDS = `
  id
  title { romaji english native }
  coverImage { large color }
  bannerImage
  description(asHtml: false)
  averageScore
  episodes
  genres
  status
  season
  seasonYear
  format
  studios(isMain: true) {
    edges {
      id
      node {
        name
        siteUrl
      }
    }
  }
`

export const getTopAnime = (limit = 10) =>
  gql(
    `
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        media(type: ANIME, sort: SCORE_DESC, isAdult: false) { ${MEDIA_FIELDS} }
      }
    }
  `,
    { page: 1, perPage: limit },
  ).then((d) => d.Page.media)

export const getUpcomingAnime = (limit = 10) =>
  gql(
    `
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        media(type: ANIME, status: NOT_YET_RELEASED, sort: POPULARITY_DESC, isAdult: false) { ${MEDIA_FIELDS} }
      }
    }
  `,
    { page: 1, perPage: limit },
  ).then((d) => d.Page.media)

// Seasonal — paginated, 20/halaman
export const getSeasonalAnime = (year, season, page = 1, perPage = 20) =>
  gql(
    `
    query ($year: Int, $season: MediaSeason, $page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo { currentPage hasNextPage lastPage total }
        media(
          type: ANIME
          seasonYear: $year
          season: $season
          sort: POPULARITY_DESC
          isAdult: false
          format_not: MUSIC
        ) { ${MEDIA_FIELDS} }
      }
    }
  `,
    { year, season: season.toUpperCase(), page, perPage },
  ).then((d) => ({ items: d.Page.media, pageInfo: d.Page.pageInfo }))

async function fetchAllPages(query, variables, getItems) {
  const MAX_PAGES = 6
  let page = 1
  let all = []

  while (page <= MAX_PAGES) {
    const data = await gql(query, { ...variables, page, perPage: 50 })
    const { items, hasNextPage } = getItems(data)
    all = all.concat(items)
    if (!hasNextPage) break
    page++
  }

  return all
}

export const getWeeklySchedule = (weekStart, weekEnd) =>
  fetchAllPages(
    `
    query ($start: Int, $end: Int, $page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo { hasNextPage }
        airingSchedules(airingAt_greater: $start, airingAt_lesser: $end, sort: TIME) {
          airingAt
          episode
          media { ${MEDIA_FIELDS} }
        }
      }
    }
  `,
    { start: weekStart, end: weekEnd },
    (d) => ({ items: d.Page.airingSchedules, hasNextPage: d.Page.pageInfo.hasNextPage }),
  )

export const searchAnime = (keyword, limit = 10) =>
  gql(
    `
    query ($search: String, $page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        media(type: ANIME, search: $search, isAdult: false) { ${MEDIA_FIELDS} }
      }
    }
  `,
    { search: keyword, page: 1, perPage: limit },
  ).then((d) => d.Page.media)

// Detail + trailer + source + characters + recommendations + reviews
export const getAnimeDetail = (id) =>
  gql(
    `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        ${MEDIA_FIELDS}
        source
        duration
        popularity
        trailer {
          id
          site
          thumbnail
        }
        characters(sort: ROLE, perPage: 12) {
          edges {
            role
            node {
              id
              name { full native }
              image { large }
            }
            voiceActors(language: JAPANESE) {
              id
              name { full }
              image { large }
            }
          }
        }
        recommendations(sort: RATING_DESC, perPage: 6) {
          nodes { mediaRecommendation { ${MEDIA_FIELDS} } }
        }
        reviews(sort: RATING_DESC, perPage: 5) {
          nodes { summary rating user { name } }
        }
      }
    }
  `,
    { id },
  ).then((d) => d.Media)

export default {
  getTopAnime,
  getUpcomingAnime,
  getSeasonalAnime,
  getWeeklySchedule,
  searchAnime,
  getAnimeDetail,
}
