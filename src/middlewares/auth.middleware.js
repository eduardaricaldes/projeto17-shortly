import { AuthSchema } from '../schemas/auth.schema.js';
import { query } from '../database/db.js';
import { GetSessionQuery, GetUserByIdQuery } from '../database/queries/account.query.js';

export async function AuthMiddleware(req, res, next) {
  const authenticationCode = req.get('Authorization');

  const { error } = AuthSchema.validate({
    token: authenticationCode,
  })
  
  if(error) {
    const erros = error.details.map((details) => details.message)
    return res.status(401).send(erros)
  }

  const token = authenticationCode.split(" ")[1];

  try {
    const { rows } = await query(GetSessionQuery, [token]);
    const session = rows[0];
    if(session !== null) {
      const { rows: userRow } = await query(GetUserByIdQuery, [session.id])
      const user = userRow[0];
      if (!user) {
        return res.status(401).send('Unauthorized');
      }

      req.user = user;
      next();
    }else {
      res.status(401).send('Unauthorized');
    }
  } catch (error) {
    res.status(500).send(error)
  }
}