import { User } from './entities/user.entity';
import { DataSource } from 'typeorm';


export const AppDataSource = new DataSource({
	type: 'postgres',
	host: 'postgres',
	port: 5432,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	synchronize: true,
	logging: true,
	entities: [User]
	// dropSchema: true, // drop all table when restart
	// migrations: [],
	// subscribers: [],
});
