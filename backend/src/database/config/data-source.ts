import 'dotenv/config'
import { DataSource } from "typeorm";
import { TaskTypeOrmEntity } from '../../task/infrastructure/persistence/task.typeorm.entity';

export const dataSource = new DataSource({
    type: 'postgres',
    url: process.env.DB_URL,
    entities: [TaskTypeOrmEntity],
    migrations: ['src/migrations/*{.ts,.js}'],
    synchronize: false,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
})