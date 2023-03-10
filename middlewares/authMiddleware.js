const authentication = async (req, res, next) => {
    if (!req.headers.cookie) {
        res.clearCookie('auth');
        return res.status(401).render('home/404')
    }

    next();
};

const utf = async (req, res, next) => {
    req.get('Accept-Charset');    
    req.acceptsCharsets('UTF-8'); 

    next();
};


export default {
    authentication,
    utf,
};