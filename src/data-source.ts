import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "./entity/User";
import ormconfig from "../ormconfig.json";

// TypeORM 0.3 removed createConnection() and no longer loads ormconfig.json
// on its own. The connection settings stay in that file; entities are passed
// as classes so ts-node does not depend on the old glob.
export const AppDataSource = new DataSource({
  ...(ormconfig as DataSourceOptions),
  entities: [User],
});
