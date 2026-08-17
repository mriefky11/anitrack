import { gql } from '../axios.js'

const MANGA_FIELDS = `
  id
  title { romaji english native }
  coverImage { large color }
  bannerImage
  description(asHtml: false)
  popularity
  averageScore
  genres
  status
  format
  chapters
  volumes
  startDate { day month year }
  endDate { day month year }
`

export const getTopManga = (limit = 10) =>
  gql(
    `
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        media(type: MANGA, sort: POPULARITY_DESC, isAdult: false) { ${MANGA_FIELDS} }
      }
    }
  `,
    { page: 1, perPage: limit },
  ).then((d) => d.Page.media)

export const searchManga = (keyword, limit = 10) =>
  gql(
    `
    query ($search: String, $page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        media(type: MANGA, search: $search, isAdult: false) { ${MANGA_FIELDS} }
      }
    }
  `,
    { search: keyword, page: 1, perPage: limit },
  ).then((d) => d.Page.media)

// Detail + characters + staff + recommendations + reviews
export const getMangaDetail = (id) =>
  gql(
    `
    query ($id: Int) {
      Media(id: $id, type: MANGA) {
        ${MANGA_FIELDS}
        source
        staff(sort: RELEVANCE, perPage: 4) {
          edges {
            role
            node {
              id
              name { full }
              image { large }
            }
          }
        }
        trailer {
          site
          id
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
          }
        }
        recommendations(sort: RATING_DESC, perPage: 6) {
          nodes { mediaRecommendation { ${MANGA_FIELDS} } }
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
  getTopManga,
  searchManga,
  getMangaDetail,
}
