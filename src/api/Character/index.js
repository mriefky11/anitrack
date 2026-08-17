import { gql } from '../axios.js'

const CHARACTER_FIELDS = `
  id
  name { full native alternative }
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
        bloodType
        siteUrl
        media(sort: POPULARITY_DESC, perPage: 12) {
          edges {
            characterRole
            voiceActors(language: JAPANESE) {
              id
              name { full }
              image { large }
            }
            node {
              id
              type
              title { romaji english }
              coverImage { large }
              averageScore
              format
              status
            }
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
