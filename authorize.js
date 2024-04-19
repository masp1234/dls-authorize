import jwt from 'jsonwebtoken'

function authorize(role, options = {}) {
    const {
        cookieName = '_auth',
        secret = process.env.SECRET,
        rolePropertyName = 'userType',
    } = options;

    return async (req, res, next) => {
        const token = req.cookies[cookieName];
        if (token) {
            const claims = jwt.verify(token, secret)
            console.log(claims)
            if (claims[rolePropertyName] && claims[rolePropertyName] === role) {
                console.log(claims[rolePropertyName])
                return next()
            }
        }
        res.status(401).send({ message: `You are unauthorized. You must be role '${role}' or higher.`})
    }
}     

export default authorize;