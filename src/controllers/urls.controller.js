import {nanoid} from 'nanoid'
import { CreateShortUrlRepository } from "../repositories/urls.repository.js";

export const CreateShortUrlController = async(req,res) => {
    try {
        const {
            url
        } = req.body;
        const userId = req.user.id;
        
        const shortUrl = nanoid().toLocaleLowerCase();
        const shortUrlResponse = await CreateShortUrlRepository({
            shortUrl,
            url,
            userId,
        })

        if(shortUrlResponse) {
            res.send(shortUrl);
        }else{
            res.status(400).send()
        }
    } catch (error) {
        console.error(error)
        res.status(500).send()
    }
};