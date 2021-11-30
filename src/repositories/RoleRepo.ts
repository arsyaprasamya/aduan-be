import Postgres from "src/config/postgres";

export const getAllRoles: () => Promise<any> = () =>
  new Promise(
    (resolve: (value: any) => void, reject: (reason?: any) => void) => {
      const postgres = new Postgres();
      postgres.query(
        'SELECT * FROM "role"',
        [],
        (result: any) => {
          // kalo berhasil
          resolve(result.rows);
        },
        (reason: any) => {
          // kalau gagal
          reject(reason);
        }
      );
    }
  );

export default {
  getAllRoles,
};
