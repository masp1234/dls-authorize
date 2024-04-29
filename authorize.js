import jwt from 'jsonwebtoken'

function authorize(role, options = {}) {
    const {
        cookieName = '_auth',
        secret = process.env.AUTH_SECRET,
        rolePropertyName = 'userType',
    } = options;

    if (!secret) {
        throw new Error('No secret provided. Add AUTH_SECRET to .env or provide it in the options parameter.')
    }

    return async (req, res, next) => {
        const token = req.cookies[cookieName];
        if (token) {
            const claims = jwt.verify(token, secret)
            if (claims[rolePropertyName] && claims[rolePropertyName] === role) {
                req.user.claims = claims;
                return next();
            }
        }
        res.status(401).send({ message: `You are unauthorized. You must be role '${role}'.`})
    }
}     

export default authorize;