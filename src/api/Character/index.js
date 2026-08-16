import { gql } from '../axios.js'

const CHARACTER_FIELDS = `
  id
  name { full native }
  image { large }
  favourites
  gender
`

export const getTop = (limit = 10) =>
  gql(
    `
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        characters(sort: FAVOURITES_DESC) { ${CHARACTER_FIELDS} }
      }
    }
  `,
    { page: 1, perPage: limit },
  ).then((d) => d.Page.characters)

export const search = (keyword, limit = 10) =>
  gql(
    `
    query ($search: String, $page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        characters(search: $search) { ${CHARACTER_FIELDS} }
      }
    }
  `,
    { search: keyword, page: 1, perPage: limit },
  ).then((d) => d.Page.characters)

export const getDetail = (id) =>
  gql(
    `
    query ($id: Int) {
      Character(id: $id) {
        ${CHARACTER_FIELDS}
        description(asHtml: false)
        dateOfBirth { day month year }
        age
        media(sort: POPULARITY_DESC, perPage: 6) {
          nodes {
            id
            title { romaji }
            coverImage { large }
            averageScore
          }
        }
      }
    }
  `,
    { id },
  ).then((d) => d.Character)

export default {
  getTop,
  search,
  getDetail,
}
