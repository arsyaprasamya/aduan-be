import Postgres from "../config/postgres";

const getAllUsers: (
  roleId: number[],
  keyword: string,
  page: number,
  perPage: number,
  orderBy: string,
  order: string
) =>
  Promise<any> = (
    roleId: number[],
    keyword: string,
    page: number,
    perPage: number,
    orderBy: string,
    order: string
  ) =>
    new Promise((
      resolve: (value: any) => void,
      reject: (reason?: any) => void
    ) => {
      console.log(roleId)
      const postgres = new Postgres()
      postgres
        .query(
          `
                SELECT "user".*, "lembaga".nama_lembaga as lembaga, "role".nama_role as role
                FROM "user"
                  LEFT JOIN "lembaga" ON "user".lembaga_id = "lembaga".id
                  LEFT JOIN "role" ON "role".id = "user".role_id
                WHERE email LIKE $1
                  AND role_id IN (${roleId.join(',')})
                  ORDER BY ${orderBy} ${order}
                  LIMIT $2 OFFSET $3
                `,
          [
            `%${keyword}%`,
            perPage, // total row
            (page - 1) * perPage, // mulainya
          ]
        )
        .then((result: any) => {
          console.log(result)
          resolve(result.rows)
        })
        .catch((reason: any) => {
          reject(reason)
        })
    })

const getCountUsers: (
  roleId: number[]
) =>
  Promise<any> = (
    roleId: number[]
  ) =>
    new Promise((
      resolve: (value: any) => void,
      reject: (reason?: any) => void
    ) => {
      const postgres = new Postgres()

      postgres
        .query(
          `
          SELECT COUNT(*)
          FROM "user"
          WHERE role_id IN (${roleId.join(',')})
        `,
          []
        )
        .then((result: any) => {
          resolve(result.rows[0].count)
        })
        .catch((reason: any) => {
          reject(reason)
        })
    })

export default {
  getAllUsers,
  getCountUsers
}