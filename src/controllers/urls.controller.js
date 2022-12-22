import {nanoid} from 'nanoid'
import {
    CreateShortUrlRepository,
    GetShortUrlByIdRepository,
    GetShortUrlByTagRepository,
    IncreseVisitCountByUserIdRepository,
} from "../repositories/urls.repository.js";

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

export const GetShortUrlByIdController = async(req, res) => {
    try {
        const {
            id,
        } = req.params

        if(!id || isNaN(id)) {
            return res.status(400).send()
        }

        const response = await GetShortUrlByIdRepository({
            id
        });
        if(!response) {
            res.status(404).send();
        }
        res.send(response);
    } catch (error) {
        console.error(error)
        res.status(500).send(error);
    }
};

export const RedirectController = async(req, res) => {
    try {
        
        const {
            shortUrl
        } = req.params;

        const shortUrlResponse = await GetShortUrlByTagRepository({ shortUrl });
        if(!shortUrlResponse) {
            res.status(404).send();
        }
        const shortUrlId = shortUrlResponse.id;
        
        await IncreseVisitCountByUserIdRepository({ shortUrlId });

        res.redirect(shortUrlResponse.url)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
};