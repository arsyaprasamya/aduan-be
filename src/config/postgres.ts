import { resolve } from "path/posix";
import { Pool, PoolConfig } from "pg";
type CallbackReturnType = (a: any) => void;

class Postgres {
  private pool: Pool | null = null;
  private config: PoolConfig | null = null;

  constructor() {
    // untuk isi config
    this.config = {
      host: "localhost",
      user: "postgres",
      password: "08520852",
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    };
    // setup pool with pre-define config
    this.pool = new Pool(this.config);
  }

  public query = (
    sql: string,
    values: any[] = [],
  ) =>
    new Promise((
      resolve: (value: unknown) => void,
      reject: (reason?: any) => void,
    ) => {
      if (this.pool != null) {
        this.pool.connect((err, client, release) => {
          if (err) {
            // Jika connection failed
            reject(err)
          }
          client
            .query(sql, values)
            .then((result) => {
              // Jika berhasil
              resolve(result)
            })
            .catch((err) => {
              // Kalau error saat query
              reject(err)
            })
            .finally(() => {
              // supaya gak kepenuhan, client harus di releasae
              release()
            })
        })
      } else {
        // Kalau pool tidak berhasil ke create
        reject("Pool has not been set")
      }
    })
}

export default Postgres;
