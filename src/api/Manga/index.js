import { gql } from '../axios.js'

const MEDIA_FIELDS = `
    id
    title {
      romaji
      english
    }
    coverImage {
      large
    }
    averageScore
    episodes
    genres
    status
    season
    seasonYear
    description
    popularity
`

export const getTopManga = (limit = 10) =>
  gql(
    `
      query ($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          media(type: MANGA, sort: POPULARITY_DESC, isAdult: false) { ${MEDIA_FIELDS} }
        }
      }
    `,
    { page: 1, perPage: limit },
  ).then((d) => d.Page.media)

export default {
  getTopManga,
}
