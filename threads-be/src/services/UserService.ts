import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

class UserService {
  private readonly authRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async findOne(loginSession: any): Promise<any> {
    try {
      const user = await this.authRepository.findOne({
        where: {
          id: loginSession.user.id,
        },
      });

      return {
        user: user,
      };
    } catch (err) {
      throw new Error("Something went wrong on the server!");
    }
  }
}

export default new UserService();
