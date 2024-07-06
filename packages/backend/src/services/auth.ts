import { CreateUserDTO, LoginUserDTO } from 'auth';
import { Auth } from '../common/models/Entity/auth';
import { User } from '../common/models/Entity/user';
import { PostgresDataSource } from '../common/models/datasource';
import * as argon2 from 'argon2';

export const registerUserService = async (user: CreateUserDTO) => {
  const queryRunner = PostgresDataSource.createQueryRunner();
  try {
    const { username, password, name, last_name, birthday, email } = user;
    
    const hashedPassord = await hashPassword(password);

    const newUser = new User();
    newUser.name = name;
    newUser.lastName = last_name;
    newUser.birthday = birthday;
    newUser.email = email;

    const newAuth = new Auth();
    newAuth.username = username;
    newAuth.password = hashedPassord;
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

const hashPassword = async (password:string) => {

  const hashed = await argon2.hash(password);

  return hashed;
};

export const loginUserService = async (userLogin: LoginUserDTO) => {  
  return await Auth.findOneByOrFail({username: userLogin.username });
};