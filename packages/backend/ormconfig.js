module.exports = {
    "type": "postgres",
    "host": process.env.POSTGRES_HOST || "0.0.0.0",
    "port": process.env.POSTGRES_PORT || 5432,
    "username": process.env.POSTGRES_USER || "postgres",
    "password": process.env.POSTGRES_PASSWORD || "admin",
    "database": process.env.POSTGRES_DB || "cryptocoin",
    "synchronize": false,
    "logging": true,
    "entities": [
        "src/entity/*.ts"
    ],
    "migrations": [
        "src/migration/*.ts"
    ],
    "subscribers": [
        "src/subscriber/*.ts"
    ],
    "cli": {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migration",
        "subscribersDir": "src/subscriber"
    }
}
