const jwt = require("jsonwebtoken")

/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

module.exports = async (req, res, next) => {
  try {
    console.log(req)
    const token = req.cookies.token
  if (!token)
  {res.status(401).json({ you: 'shall not pass!' });}

  jwt.verify(token, process.env.SECRET, (err,decoded) => {
    if(err){
      return res.status(401).json({
        message: "Invalid credentials",
      })
    }

    req.token = decoded

    next()
  })} catch(er){
    next(er)
  }
};
