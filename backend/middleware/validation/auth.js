const jwt = require('jsonwebtoken');
const User = require('../../models/Login')

exports.isAuth = async (req, res, next) => {
    if(req.headers && req.headers.authorization)
    {
        const token = req.headers.authorization.split(' ')[1]
        
        try 
        {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decode.userId);
        if(!user) {
            return res.status(401).json({success: false, message: 'Your session is no longer valid. Please sign in again.'});
        }

        req.user = user;
        next();
        } 

        catch (error) 
        {
            if(error.name === 'JsonWebTokenError'){
                return res.status(401).json({success: false, message: 'Your session is no longer valid. Please sign in again.'});
            }

            if(error.name === 'TokenExpiredError'){
                return res.status(401).json({success: false, message: 'Your session has expired. Please sign in again.'});
            }

            return res.status(500).json({success: false, message: 'Could not verify your session. Please try again.'});
        }
        
    }
    else
    {
        res.status(401).json({success: false, message: 'Sign in to access your profile.'});
    }
};
