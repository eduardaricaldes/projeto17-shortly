import { query } from '../database/db.js';
import { CreateAccountQuery, GetUserByEmailQuery, SignInQuery } from '../database/queries/account.query.js';

export const SignUpRepository = async ({ name, email, password }) => {
    try {
        const { rows: userRow } = await query(GetUserByEmailQuery, [email]);
        if(userRow[0] !== undefined) {
            return false;
        }

        const { rows } = await query(CreateAccountQuery, [
            name,
            email,
            password,
        ])

        if(rows[0] !== null) {
            return true
        }else{
            return false
        }
    } catch (error) {
        return error;
    }
};

export const SignInRepository = async({ email }) => {
    try {
        const { rows: userRows } = await query(SignInQuery, [
            email,
        ]);

        return userRows[0];
    } catch (error) {
        console.error(error)
        return error;
    }
}