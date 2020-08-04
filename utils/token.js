const jwt = require('jsonwebtoken')

exports.generateTokens = async(id, role) => {
    return await Promise.all([jwt.sign({ id, role }, process.env.SECRETKEY, {
        expiresIn: '6000s'
    }), jwt.sign({ id, role }, process.env.REFRESHTOKENKEY, {
        expiresIn: 15778800000
    })])
}