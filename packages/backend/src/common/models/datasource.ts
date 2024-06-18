import { DataSource } from "typeorm"
import { Movements } from "./entities/movements"
import { MovementType } from "./entities/movement-type"
import { Stocks } from "./entities/stocks"


export const PostgresDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "finances",
    password: "testing123456",
    database: "finances",
    synchronize: true,
    entities: [
       MovementType,Movements, Stocks
    ],
})