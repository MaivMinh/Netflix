const pgp = require("pg-promise")({
  capSQL: false,
});
require("dotenv").config();
const option = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
};

const db = pgp(option);

module.exports = {
  addUser: async (user) => {
    let dbConnect = null;
    try {
      dbConnect = await db.connect();
      const queryString = pgp.helpers.insert(user, null, "users");
      await dbConnect.query(queryString);
      return true;
    } catch (error) {
      console.log(error.message + " db_addUser()");
      return false;
    } finally {
      if (dbConnect) dbConnect.done();
    }
  },

  getUser: async (username) => {
    let dbConnect = null;
    try {
      dbConnect = await db.connect();
      const result = await dbConnect.one(`
        SELECT *
        FROM "users"
        WHERE "username" = '${username}'
      `);
      return result;
    } catch (error) {
      console.log(error.message + " db_getUser()");
      return false;
    } finally {
      if (dbConnect) dbConnect.done();
    }
  },
};
