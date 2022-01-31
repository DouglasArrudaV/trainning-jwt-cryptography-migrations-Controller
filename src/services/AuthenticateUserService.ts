import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { UserRepositories } from "../repositories/UsersRepositories";

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute({email, password}: IAuthenticateRequest) {
        const userRepositories = getCustomRepository(UserRepositories);

        // Verificar se email existe 
        const user = await userRepositories.findOne({
            email
        });

        if(!user) {
            throw new Error("Invalid Combination")
        }

        // Verificar se senha está correta
        const passwordMatch = await compare(password, user.password) ;

        if(!passwordMatch) {
            throw new Error("Invalid Combination")
        }

        //Gerar token
        const token = sign({
            email: user.email
        }, "a094bcdc22f561de6333045f937c32b6", {
            subject: user.id,
            expiresIn: "1d"
        });
    }
}

export {AuthenticateUserService}