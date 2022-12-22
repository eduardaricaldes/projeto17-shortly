import {
    CreateShortUrlQuery,
    GetShortUrlByIdQuery,
    GetShortUrlByTagQuery, 
    DeleteShortUrlByIdQuery,
    RankingShortUrlsQuery,
    GetUrlsUserQuery
} from "../database/queries/urls.query.js";
import { query } from '../database/db.js';

export const CreateShortUrlRepository = async({ shortUrl, url, userId }) => {
    try {
        const createdAt = new Date(Date.now()).toISOString();
        const { rows } = await query(CreateShortUrlQuery, [
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
};

export const GetShortUrlByIdRepository = async({ id }) => {
    try {
        const { rows } = await query(GetShortUrlByIdQuery, [id])

        if(rows[0] !== null) {
            return rows[0]
        }else{
            return null
        }
    } catch (error) {
        return error;
    }
};

export const GetShortUrlByTagRepository = async({ shortUrl }) => {
    try {
        const { rows } = await query(GetShortUrlByTagQuery, [shortUrl])

        if(rows[0] !== null) {
            return rows[0]
        }else{
            return null
        }
    } catch (error) {
        return error;
    }
};

export const DeleteShortUrlByIdRepository = async({ id, userId }) => {
    try {
        const { rows } = await query(DeleteShortUrlByIdQuery, [id, userId])

        if(rows[0] !== null) {
            return rows[0]
        }else{
            return null
        }
    } catch (error) {
        return error;
    }
};

export const GetUserShortUrlListRepository = async() => {
    try {
        const { rows } = await query(GetUrlsUserQuery, [])

        if(rows[0] !== null) {
            return rows
        }else{
            return null
        }
    } catch (error) {
        return error;
    }
};

export const GetRankingRepository = async() => {
    try {
        const { rows } = await query(RankingShortUrlsQuery, [])

        if(rows[0] !== null) {
            return rows
        }else{
            return null
        }
    } catch (error) {
        return error;
    }
};