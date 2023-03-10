import express from 'express';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import routes from './routes.js';

const app = express();
const config = dotenv.config().parsed;
const PORT = +config.PORT;

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

app.set('view engine', 'hbs');

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(routes);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));