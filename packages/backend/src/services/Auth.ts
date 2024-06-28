import { CreateUserDTO } from "auth";
import { Auth } from "../common/models/Entity/Auth";
import { User } from "../common/models/Entity/User";
import { PostgresDataSource } from "../common/models/datasource";

export const registerUserService = async (user: CreateUserDTO) => {
  const queryRunner = PostgresDataSource.createQueryRunner();
  try {
    const { username, password, name, last_name, birthday, email } = user;
    
    const newUser = new User();
    newUser.name = name;
    newUser.lastName = last_name;
    newUser.birthday = birthday;
    newUser.email = email;

    const newAuth = new Auth();
    newAuth.username = username;
    newAuth.password = password;
    newAuth.user = newUser;

    await queryRunner.startTransaction();

    await queryRunner.manager.save(newUser);
    
    await queryRunner.manager.save(newAuth);

    await queryRunner.commitTransaction();

  } catch (error) {

    await queryRunner.rollbackTransaction();

    throw error;

  } finally{
    await queryRunner.release();
  }
};
