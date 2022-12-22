import { query } from '../database/db.js';
import { CreateSessionQuery, GetSessionQuery, GetSessionActiveWithUser } from '../database/queries/account.query.js';

export const CreateSessionRepository = async({ user_id, token }) => {
    try {
        const status = true;
        const createdat = new Date(Date.now()).toISOString();
        const { rows } = await query(CreateSessionQuery, [
            token,
            user_id,
            status,
            createdat,
        ])

        if(rows[0] !== null) {
            return token
        }else{
            return null
        }
    } catch (error) {
        return error;
    }
}

export const GetSessionRepository = async({ token }) => {
    try {
        const { rows } = await query(GetSessionQuery, [token]);
        return rows[0];
    } catch (error) {
        return error;
    }
}

export const GetSessionActiveRepository = async({ user_id }) => {
    try {
        const { rows } = await query(GetSessionActiveWithUser, [user_id]);
        return rows[0];
    } catch (error) {
        return error;
    }
}