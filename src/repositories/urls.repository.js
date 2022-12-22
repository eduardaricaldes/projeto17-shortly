import { CreateShortUrl } from "../database/queries/urls.query.js";
import { query } from '../database/db.js';

export const CreateShortUrlRepository = async({ shortUrl, url, userId }) => {
    try {
        const createdAt = new Date(Date.now()).toISOString();
        const { rows } = await query(CreateShortUrl, [
            shortUrl,
            url,
            createdAt,
            userId
        ])

        if(rows[0] !== null) {
            return rows[0].shortUrl
        }else{
            return null
        }
    } catch (error) {
        return error;
    }
}