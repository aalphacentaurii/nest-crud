import { env } from './env';

//modules
import { SequelizeModule, SequelizeModuleOptions } from "@nestjs/sequelize";
import { DynamicModule } from "@nestjs/common";

//models
import User from './models/users.model';

env.global;

const dbConfig = {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    models: [ User ],
    synchronize: false,
    autoLoadModels: true
}

export const db:DynamicModule = SequelizeModule.forRoot(dbConfig as SequelizeModuleOptions);

export default dbConfig;
