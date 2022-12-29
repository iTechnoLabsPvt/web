const jwt = require('jsonwebtoken');
const path = require('path')
const loginEnv = require('dotenv').config({ path: path.resolve(__dirname, '../env/loginVerify.env') })

module.exports = (req, res, next) => {
  const token = req.headers['x-access-token']  
  
  if (token == null)
  	{
      return res.status(403).send({status:403, message: "Unauthorized"})
  	}   
  	jwt.verify(token, loginEnv.parsed.secret, (err, user) => {
  
      if(user){
        req.user = user
        next()
      }
      else{
        console.log(err)
        return res.status(403).send({status:403, message: "Unauthorized"})
      }  
    })
	
};




