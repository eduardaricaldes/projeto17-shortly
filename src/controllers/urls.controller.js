import {nanoid} from 'nanoid'
import {
    CreateShortUrlRepository,
    GetShortUrlByIdRepository,
    GetShortUrlByTagRepository,
    IncreseVisitCountByUserIdRepository,
    DeleteShortUrlByIdRepository,
    GetUserShortUrlListRepository,
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

export const DeleteShortByIdController = async(req, res)=>{
    try {
        const {
            id,
        }= req.params
        if(!id || isNaN(id)) {
            return res.status(400).send()
        }

        const response = await GetShortUrlByIdRepository({
            id
        });

        if(!response){
            return res.status(404).send();
        }

        await DeleteShortUrlByIdRepository({
            id: response.id,
            userId: response.user_id,
        })
        res.status(204).send()
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    
    }
}

export const GetUsersMeController = async(req, res)=>{
    try {
        const user = req.user;
        const userList = await GetUserShortUrlListRepository({
            userId: user.id
        })

        if(!userList) {
            return res.status(404).send();
        }

        let sumVisitCount = 0;
        const shortenedUrls = userList?.reduce((prev, current) => {
            const obj = {
                id: current.urlid,
                shortUrl: current.shorturl,
                url: current.url,
                visitCount: parseInt(current.visitcount),
            }
            sumVisitCount += parseInt(current.visitcount);

            prev.push(obj)
            return prev;
        }, []);

        const userShortly = userList[0];
        const response = {
            id: userShortly.id,
            name: userShortly.name,
            visitCount: sumVisitCount,
            shortenedUrls,
        }

        res.send(response)

    } catch (error) {
        
    }
}