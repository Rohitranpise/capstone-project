module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "Rohit2759",
    DB: "login",
    dialect: "postgres",
    pool: {
        max: 5, //max no of conn in the pool
        min: 0, //min no of conn
        acquire: 30000,  //mx time pool will required to get connection
        idle: 10000   //max time pool will try to get conn before throwing error.
    }
}