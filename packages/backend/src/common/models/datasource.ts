import { DataSource } from "typeorm";
import { Movement } from "./Entity/Movement";
import { MovementType } from "./Entity/MovementType";
import { Stock } from "./Entity/Stock";
import { User } from "./Entity/User";
import { Auth } from "./Entity/Auth";

export const PostgresDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [MovementType, Movement, Stock, User, Auth],
});
