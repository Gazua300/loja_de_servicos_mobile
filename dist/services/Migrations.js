"use strict";
/* import { Knex } from 'knex'


export async function up(knex:Knex):Promise<void>{
    await knex.schema.createTable('labeninja_users', table=>{
        table.string('id', 255).primary().notNullable()
        table.string('name', 50).notNullable()
        table.string('email', 150).notNullable()
        table.string('password', 255).notNullable()
    })
} */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConnectDatabase_1 = __importDefault(require("../data/ConnectDatabase"));
class Migrations extends ConnectDatabase_1.default {
}
Migrations.createTable = () => {
    ConnectDatabase_1.default.con.raw(`
            create table labeninja_users(id VARCHAR(255) PRIMARY KEY NOT NULL, name VARCHAR(50) not null,
            email VARCHAR(150) not null, password VARCHAR(255) not null);
        `).then(() => {
        console.log('Tabela criada com sucesso');
    }).catch(e => {
        console.log(`Erro ao criar tabela: ${e}`);
    });
};
exports.default = Migrations;
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield Migrations.createTable();
}))();
