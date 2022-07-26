module.exports = {
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DB: process.env.DB,
    PORT: process.env.DB_PORT,
    dialect: "postgres",
    pool: {
        max: 5, //max no of conn in the pool
        min: 0, //min no of conn
        acquire: 30000,  //mx time pool will required to get connection
        idle: 10000   //max time pool will try to get conn before throwing error.
    }
}