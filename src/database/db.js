import pkg from 'pg';
import config from '../config/configuration.js';

const { Pool } = pkg;

const uri = `postgres://{USER}:{PASSWORD}@{HOST}/{DB_NAME}`;

const connectionString = uri.replace("{USER}",config.DATABASE_USER)
         .replace("{PASSWORD}", config.DATABASE_PASSWORD)
         .replace("{HOST}",config.DATABASE_HOST)
         .replace("{DB_NAME}", config.DATABASE_NAME);

const pool = new Pool({ connectionString });

pool.on('connect', () => {
  console.log('Base de Dados conectado com sucesso!');
});

pool.on("error", (err) => {
    console.error(err);
    console.error("Erro na conexao com o banco de dados");
})

const query = (text, params) => pool.query(text, params);

export { query };
