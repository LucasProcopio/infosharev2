const { extractToken } = require('../helpers/tokenHelpers');
const jwt = require('jsonwebtoken');
const usersHelpers = require('../helpers/usersHelpers');

const secret = process.env.SECRET;

const validateToken = async (req, res, next) => {
  const token = extractToken(req);
  if(!token) return res.status(404).json(
    { 
      message: 'Bearer Token must be provided'
    }
  );

  const {decodedObj, error} = verifyJwt(token);
  if(error) {
    return res.status(404).json({ message: error });
  }

  const { id, email} = decodedObj.data;
  const isValidUser = await usersHelpers.verifyUser({ userId: id, email: email });

  if(!isValidUser) return res.status(404).json({ 
    message: 'Access Denied user is not permitted' 
  });
  
  next();
}

const verifyJwt = jwtToken => {
  const response = {decodedObj: undefined, error: false };
  try {
    response.decodedObj = jwt.verify(jwtToken,secret);
    return response;
  } catch (error) {
     console.log(error);
     response.error = `Invalid Token: ${error.message}`;
     return  response;
  }
};

module.exports = { validateToken }