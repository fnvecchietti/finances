import { DataSource } from "typeorm";
import { Movement } from "./Entity/Movement";
import { MovementType } from "./Entity/MovementType";
import { Stock } from "./Entity/Stock";
import { User } from "./Entity/User";
import { Auth } from "./Entity/Auth";

export const PostgresDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "finances",
  password: "testing123456",
  database: "finances",
  synchronize: true,
  entities: [MovementType, Movement, Stock, User, Auth],
});
