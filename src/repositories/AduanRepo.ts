import { resolve } from "path/posix";
import Postgres from "src/config/postgres";

export const getAllAduans: (
  keyword: string,
  page: number,
  perPage: number
) => Promise<any> = (keyword: string, page: number, perPage: number) =>
    new Promise(
      (resolve: (value: any) => void, reject: (reason?: any) => void) => {
        const postgres = new Postgres();
        postgres.query(
          `
            SELECT 
                aduan.*, 
                "role".nama_role AS nama_role, 
                aduan_kategori.nama_kategori AS kategori,
                lembaga.nama_lembaga AS nama_lembaga,
                "user".email AS email
            FROM "aduan"
                LEFT JOIN "role" ON "role".id = aduan.role_id
                LEFT JOIN aduan_kategori ON aduan_kategori.id = aduan.aduan_kategori_id
                LEFT JOIN lembaga ON lembaga.id = aduan.lembaga_id
                LEFT JOIN "user" ON "user".id = aduan.user_id
            WHERE "user".email LIKE $1
            LIMIT $2 OFFSET $3
          `,
          [
            `%${keyword}%`, // yang di search
            perPage, // total row
            (page - 1) * perPage, // mulainya
          ],
        )
          .then((result: any) => {
            resolve(result.rows)
          })
          .catch((reason: any) => {
            reject(reason)
          })
      })

const getCountAduans: () => Promise<any> = async () => new Promise((
  resolve: (value: any) => void,
  reject: (reason?: any) => void
) => {
  const postgres = new Postgres()
  postgres.query(
    `
      SELECT COUNT(*) 
      FROM "aduan"
    `,
  )
    .then((result: any) => {
      resolve(result.rows[0].count)
    })
    .catch((reason: any) => {
      reject(reason)
    })
})

export default {
  getAllAduans,
  getCountAduans
};
