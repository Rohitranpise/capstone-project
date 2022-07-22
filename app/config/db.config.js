module.exports ={
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "Rohit2759",
    DB: "login",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}