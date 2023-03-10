import express from 'express';

import homeController from './controllers/homeController.js';
import authController from './controllers/authController.js';

const router = express.Router();

router.use(homeController);
router.use(authController);

router.all('*', (req, res) => {
    res.render('home/404')
});
//TODO: Add routes

export default router;