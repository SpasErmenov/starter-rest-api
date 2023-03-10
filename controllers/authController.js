import express from 'express';
import authService from '../services/authService.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const authController = express.Router();

authController
    .post('/', async (req, res) => {

        const { password } = req.body;

        try {
            const token = await authService.login(password);

            res.cookie('auth', token);

            res.status(200).redirect('/admin');

        } catch (error) {
            return res.status(400).send(error.message);
        }

    })
    .get('/admin', authMiddleware.authentication, async (req, res) => {

        const adminId = JSON.parse(atob(req.headers.cookie.split('.')[1])).id;

        const listOfPages = await authService.getAllPages();

        res.render('auth/adminPage',
            {
                admin: adminId,
                listOfPages
            });
    })
    .get('/:id', async (req, res) => {
        const id = req.params.id;
    
        try {
            const page = await authService.getPage(+id);
            
            res.render(`auth/page`, {
                page
            });
            
        } catch (error) {
            return res.status(400).send(error.message);
        }
        
    })
    .post('/admin',authMiddleware.utf, async (req, res) => {

        try {
            const page = req.body;
    
            const newPage = await authService.createPage(page);
            res.redirect('/admin')
            
        } catch (error) {
            return res.status(400).send(error.message);
        }


    })
    .get('/admin/:pageId/delete', async (req, res) => {
        //TODO: delete page
        //TODO: Check if owner
        const id = req.params.pageId;
        //console.log(typeof(+id));
        //console.log(id);
        //console.log(req.params.pageId);
        const deletedPage = await authService.deletePage(+id);
        res.redirect('/admin');
    });;

export default authController;