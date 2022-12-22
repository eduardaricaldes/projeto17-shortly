const CreateShortUrl = `
    INSERT INTO urls(shorturl, url, createdat, user_id)
    VALUES($1,$2,$3,$4)
`;

const GetShortUrlByTag = `
    SELECT url FROM urls WHERE shorturl=$1
`;

const IncrementShortUrlVisit = `
    UPDATE urls SET visitedcount = visitedcount + 1 WHERE shorturl=$1
`;

const RankingShortUrls = `
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

const GetUrlsUser = `
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
    CreateShortUrl,
    GetShortUrlByTag,
    IncrementShortUrlVisit,
    RankingShortUrls,
    GetUrlsUser,
}