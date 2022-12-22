import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { SignUpRepository, SignInRepository } from '../repositories/account.repository.js';
import { CreateSessionRepository, GetSessionActiveRepository } from '../repositories/sessions.repository.js';

export const SignUpController = async(req, res) => {
    const {
        name,
        email,
        password,
        confirmPassword,
    } = req.body;

    if(password !== confirmPassword) {
        res.status(400).send({"message": "password confirmation is not equal to password provided"})
    }

    const encryptedPassword = bcrypt.hashSync(password, 12);

    try {
        const response = await SignUpRepository({
            name, email, password: encryptedPassword,
        })
    
        if(response) {
            res.status(201).send()
        }else{
            res.status(409).send();
        }
    } catch (error) {
        res.status(500).send(error);
    }
    
}

export const SignInController = async(req,res) => {
    const {
        email,
        password,
    } = req.body;

    try {
        const user = await SignInRepository({
            email,
        })

        if(!user) {
            return res.status(401).send()
        }

        const isPasswordEqual = bcrypt.compareSync(password, user.password);
        if(!isPasswordEqual){
            return res.status(401).send()
        }

        const activeUser = await GetSessionActiveRepository({ user_id: user.id });
        if(activeUser){
            return res
                .status(401)
                .send({ message: "Você já está logado, sai para logar novamente" });
        }

        const token = uuidv4();
        const responseToken = await CreateSessionRepository({
            user_id: user.id,
            token
        })
        
        if(!responseToken) {
            return res.status(400).send()
        }
        res.status(201).send(responseToken)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}