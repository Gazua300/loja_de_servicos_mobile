/* import { Knex } from 'knex'


export async function up(knex:Knex):Promise<void>{
    await knex.schema.createTable('labeninja_users', table=>{
        table.string('id', 255).primary().notNullable()
        table.string('name', 50).notNullable()
        table.string('email', 150).notNullable()
        table.string('password', 255).notNullable()
    })
} */

import ConnectDatabase from "../data/ConnectDatabase"


export default class Migrations extends ConnectDatabase{
    public static createTable = ()=>{
        ConnectDatabase.con.raw(`
            create table labeninja_users(id VARCHAR(255) PRIMARY KEY NOT NULL, name VARCHAR(50) not null,
            email VARCHAR(150) not null, password VARCHAR(255) not null);
        `).then(()=>{
            console.log('Tabela criada com sucesso')
        }).catch(e=>{
            console.log(`Erro ao criar tabela: ${e}`)
        })
    }
}


(async()=>{
    await Migrations.createTable()
})()