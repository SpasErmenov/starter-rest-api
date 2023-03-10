import bcrypt from 'bcrypt';
import jwt from '../lib/jsonwebtoken.js';

import { SECRET } from '../config/config-constants.js';
import authData from '../data/authData.js';

const hardCodedAdminId = 1; //We need to find the user somehow and since we don't username field or something like this I hardcoded it(NOT optimal way)

const login = async (password) => {
    if (!password) {
        throw new Error('Empty password field!')
    }

    const user = await authData.getBy('id', hardCodedAdminId);

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
        throw new Error('Invalid password!')
    }
    // generate token
    const payload = {
        id: user.id,
        role_id: user.role_id,
    };
    const token = await jwt.sign(payload, SECRET)

    return token;

};

const getAllPages = async () => {
    const pages = await authData.getAllPages();

    return pages;
};

const getPage = async (pageData) => {
    const id = pageData;

    
    const page = await authData.getByPages('id', id);

    if (!page) {
        throw new Error(`Page with id: ${id} missing!`)
    }
    return page;
}

const createPage = async (pageData) => {
    const { id, title, meta_description, content } = pageData;

    if (!id || !title || !meta_description || !content) {
        throw new Error('Empty field/s!')
    }

    const user = await authData.getBy('id', hardCodedAdminId);
    if (!user) {
        throw new Error('Invalid user!')
    }
    const pageId = await authData.getByPages('id', id);
    
    if (pageId) {
        throw new Error(`Page with id: ${id} already exists!`)
    }
    
    return await authData.create( id, title, meta_description, content, user.id );
};

const deletePage = async (id) => {

    const page = await authData.getByPages('id', id);

    if (!page) {
        return null;
    }

    const _ = await authData.remove(page);

    return page;
};

export default {
    login,
    getAllPages,
    getPage,
    createPage,
    deletePage,
};