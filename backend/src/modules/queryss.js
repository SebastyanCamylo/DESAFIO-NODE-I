import pkg from "pg";
const { Pool } = pkg;
//const { allowedNodeEnvironmentFlags } = require('process')

export const pool = new Pool({
  host: "localhost",
  user: "postgres", // usuario PGADMIN
  password: "admin",
  database: "likeme",
  port: "5432",
  allowExitOnIdle: "true",
});

/* const getDate = async () => {
    const result = await pool.query("SELECT NOW()")
    console.log(result)
    }
    getDate() */

export const getPosts = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM posts");
    return rows;
  } catch (queryError) {
    console.error(`The was an error doing query to bd: ${queryError}`);
  }
};

export const newPost = async (title, img, description, likes) => {
  try {
    const insertValues = "INSERT INTO posts VALUES (DEFAULT, $1, $2, $3, $4)";
    const values = [title, img, description, likes];
    await pool.query(insertValues, values);
    console.log("Nueva publicidad");
  } catch (postError) {
    console.error(`Error en nueva publicidad: ${postError}`);
  }
};
