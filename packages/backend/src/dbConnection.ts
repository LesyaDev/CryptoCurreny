import "reflect-metadata";
import {Connection, createConnection} from "typeorm";
import User from "./entity/User";
import Role from "./entity/Role";
import Coin from "./entity/Coin";
import UserCoin from "./entity/UserCoin";
import TypeormConfig from "./typeormConfig";
import UserCoinAudit from "./entity/UserCoinAudit";

let _connection: Connection;
let typeormConfig = new TypeormConfig()

export async function connect() {
    _connection = await createConnection(typeormConfig.postgres);
}

export function connected() {
    return typeof _connection !== 'undefined';
}

export function getConnection(){
    return _connection;
}
export function getUserRepository() {
    return _connection.manager.getRepository(User);
}

export function getUserCoinRepository() {
    return _connection.manager.getRepository(UserCoin);
}

export function getCoinRepository() {
    return _connection.manager.getRepository(Coin);
}

export function getRoleRepository() {
    return _connection.manager.getRepository(Role);
}

export function getUserCoinAuditRepository(){
    return _connection.manager.getRepository(UserCoinAudit);
}

export function runMigration() {
    _connection.runMigrations();
}

export function showMigration() {
    return _connection.showMigrations();
}
