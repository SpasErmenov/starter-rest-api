import express from 'express';

const homeController = express.Router();

homeController
.get('/', (req, res) => {
    res.render('home');
    res.clearCookie('auth');
});

export default homeController;
