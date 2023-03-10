import pool from '../pool.js';

const getAll = async () => {
    const sql = `
    SELECT id, password, role_id
    FROM user_profile
    `;

    return await pool.query(sql);
};

const getBy = async (column, value) => {
    const sql = `
    SELECT id, password, role_id
    FROM user_profile
    WHERE ${column} = ?
    `;
    const result = await pool.query(sql, [value]);

    return result[0];
};

const getAllPages = async () => {
    const sql = `
    SELECT id, title, meta_description, content, user_id
    FROM pages
    `;

    return await pool.query(sql);
};

const getByPages = async (column, value) => {
    const sql = `
    SELECT id, title, meta_description, content, user_id
    FROM pages
    WHERE ${column} = ?
    `;
    const result = await pool.query(sql, [value]);

    return result[0];
};

const create = async ( id, title, meta_description, content, user_id ) => {
    const sql = `
    INSERT INTO pages(id, title, meta_description, content, user_id)
    VALUES (?, ?, ?, ?, ?)
    `;

    const result = await pool.query(sql, [ id, title, meta_description, content, user_id ]);


    return{
    
        id: id,
        title: title,
        meta_description: meta_description,
        content: content,
        user_id: user_id,
    };
};

const remove = async (page) => {
    const sql = `
    DELETE FROM pages
    WHERE id = ?
    `;

    return await pool.query(sql, [page.id]);
};

export default {
    getAll,
    getBy,
    getAllPages,
    getByPages,
    create,
    remove,
};