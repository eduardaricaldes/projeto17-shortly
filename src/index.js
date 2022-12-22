import express from 'express';
import cors from 'cors';
import config from './config/configuration.js';
import accountRoute from './routes/account.route.js';
import urlsRoute from './routes/urls.route.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(accountRoute);
app.use(urlsRoute);

const port = config.APP_PORT || 5000;

app.listen(port, () => {
  console.log(`${config.APP_NAME} running on port ${port}` );
});