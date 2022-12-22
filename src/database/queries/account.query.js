const CreateAccountQuery = `
    INSERT INTO users(name, email, password)
    VALUES($1,$2,$3);
`;

const SignInQuery = `
    SELECT id, email,password FROM users WHERE email=$1
`;

const GetUserByEmailQuery = `
    SELECT id, email FROM users WHERE email=$1
`;

const GetUserByIdQuery = `
    SELECT id, email FROM users WHERE id=$1
`;

const CreateSessionQuery = `
    INSERT INTO sessions(token, user_id, status, createdat)
    VALUES($1,$2,$3,$4)
`;

const GetSessionQuery = `
    SELECT id FROM sessions WHERE token=$1 AND status=true
`;

const GetSessionActiveWithUser = `
    SELECT id FROM sessions WHERE user_id=$1 AND status=true
`

const UpdateSessionQuery = `
    UPDATE sessions SET status=false WHERE id=$1 AND user_id=$2
`

export {
    CreateAccountQuery,
    SignInQuery,
    GetUserByIdQuery,
    GetUserByEmailQuery,
    CreateSessionQuery,
    GetSessionQuery,
    GetSessionActiveWithUser,
    UpdateSessionQuery,
}