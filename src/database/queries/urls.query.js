const CreateShortUrlQuery = `
    INSERT INTO urls(shorturl, url, createdat, user_id)
    VALUES($1,$2,$3,$4)
`;

const GetShortUrlByTagQuery = `
    SELECT id, url FROM urls WHERE shorturl=$1
`;

const GetShortUrlByIdQuery = `
    SELECT id, shorturl, url FROM urls WHERE id=$1
`;

const IncrementShortUrlVisitQuery = `
    UPDATE urls SET visitcount = visitcount + 1 WHERE id=$1
`;

const DeleteShortUrlByIdQuery = `
    DELETE FROM urls WHERE user_id=$1 AND id=$2
`;

const RankingShortUrlsQuery = `
    SELECT
        users.id,
        users.name,
        urls.id as urlid,
        urls.shorturl,
        urls.url,
        urls.visitcount
    FROM urls
    LEFT JOIN users ON user.id = urls.user_id
    ORDER BY urls.visitedcount DESC
    LIMIT 10
`

const GetUrlsUserQuery = `
    SELECT 
        users.id,
        users.name,
        urls.id as urlid,
        urls.shorturl,
        urls.url,
        urls.visitcount
    FROM users
    INNER JOIN urls ON urls.user_id = users.id
    WHERE users.id=$1
    GROUP BY users.id, urls.id

`;

export {
    CreateShortUrlQuery,
    GetShortUrlByTagQuery,
    GetShortUrlByIdQuery,
    IncrementShortUrlVisitQuery,
    DeleteShortUrlByIdQuery,
    RankingShortUrlsQuery,
    GetUrlsUserQuery,
}