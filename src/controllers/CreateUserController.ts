import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {
    async handle(request: Request, response: Response) {
        const {name, email, admin, password} = request.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({name, email, admin, password});

        return response.json(user);
    }
}

export {CreateUserController};

// router chama o controller
// server -> routes -> controller -> services
// o controler pega do server(que recebe a requisição) e ele pega do controller, 
// que o controller chama o service.ts
// vai funcionar como o request e response.json; pega da rota e passa para o service