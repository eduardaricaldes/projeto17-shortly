const CreateAccountQuery = `
    INSERT INTO users(name, email, password, createdat)
    VALUES($1,$2,$3,$4);
`;

const GetUserQuery = `
    SELECT id, email FROM users WHERE email=$1 AND password=$2
`;

const CreateSessionQuery = `
    INSERT INTO sessions(token, user_id, status, createdat)
    VALUES($1,$2,$3,$4)
`;

const GetSessionQuery = `
    SELECT id FROM sessions WHERE token=$1 AND user_id=$2 AND status=true
`;

const UpdateSessionQuery = `
    UPDATE sessions SET status=false WHERE id=$1 AND user_id=$2
`

export {
    CreateAccountQuery,
    GetUserQuery,
    CreateSessionQuery,
    GetSessionQuery,
    UpdateSessionQuery,
}