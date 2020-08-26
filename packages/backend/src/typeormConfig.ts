import * as path from "path"
import { ConnectionOptions } from 'typeorm';
const rootDir = path.resolve(__dirname);
const LOCAL_DB_URL = 'postgres://postgres:admin@localhost:5432/cryptocoin';

export default class TypeormConfig {
    private _postgresConnectionOptions: ConnectionOptions

    constructor(){
        this._postgresConnectionOptions = {
            type: "postgres",
            url: process.env.DATABASE_URL || LOCAL_DB_URL,
            name: process.env.POSTGRES_DATABASE || 'cryptocoin',
            username: process.env.POSTGRES_USER || "postgres",
            database: process.env.POSTGRES_DB || "cryptocoin",
            password: process.env.POSTGRES_PASSWORD || "admin",
            host: process.env.POSTGRES_HOST || "0.0.0.0",
            port: Number(process.env.POSTGRES_PORT) || 5432,
            synchronize: false,
            entities: [
                `${rootDir}/entity/*{.ts, .js}`
            ],
            migrations: [
                `${rootDir}/migration/*{.ts, .js}`
            ],
            subscribers: [
                `${rootDir}/subscriber/*{.ts, .js}`
            ],
            cli: {
                migrationsDir: `${rootDir}/migration/*{.ts, .js}`,
                entitiesDir: `${rootDir}/entity/*{.ts, .js}`,
                subscribersDir: `${rootDir}/subscriber/*{.ts, .js}`,
            }
        }
    }

    public get postgres() {
        return this._postgresConnectionOptions;
    }

    public set postgres(configs: ConnectionOptions){
        this._postgresConnectionOptions = configs;
    }
}
