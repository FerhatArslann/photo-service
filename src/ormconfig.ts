import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import 'dotenv/config'

export const ormconfig: TypeOrmModuleOptions = {
    "type": "mysql",
    "host": process.env.DB_HOST,
    "port": +process.env.DB_HOST_PORT,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "entities": ["dist/**/**/*.entity{.ts,.js}"],
    "synchronize": true
}