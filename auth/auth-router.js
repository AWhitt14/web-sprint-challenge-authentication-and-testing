const router = require('express').Router();
const db = require("../database/dbConfig")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

router.post('/register', async (req, res) => {
  const {username, password} = req.body
  const newUser = await db("users").insert({
    username,
    password: await bcrypt.hash(password, 5)
  })

  const user = await db("users").where("username", username).select("username")

  res.status(201).json(user)
});

router.post('/login', async (req, res) => {
  const {username, password} = req.body
  const user = await db("users").where("username",username).first()

  if (!user) {
    return res.status(401).json({message: "invalid credentials"})
  }
  const validPassword = await bcrypt.compare(password, user.password)

  if (!validPassword){
    return res.status(401).json({message: "invalid credentials"})
  }

  const token = jwt.sign({
    user_id: user.id,
  }, process.env.SECRET)

  res.cookie("token",token)

  res.status(200).json({
    message: `Hello ${user.username}`,
    token: token
  })
});

module.exports = router;
