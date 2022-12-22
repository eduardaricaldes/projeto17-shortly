import pkg from 'pg';
import config from '../config/configuration.js';

const { Pool } = pkg;
const pool = new Pool({
    host: config.DATABASE_HOST,
    database: config.DATABASE_NAME,
    user: config.DATABASE_USER,
    password: config.DATABASE_PASSWORD,
    port: config.DATABASE_PORT,
});

pool.on('connect', () => {
  console.log('Base de Dados conectado com sucesso!');
});

pool.on("error", (err) => {
    console.error(err);
    console.error("Erro na conexao com o banco de dados");
})

const query = (text, params) => pool.query(text, params);

export { query };
