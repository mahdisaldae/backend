const User = require('../model/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path')

require("dotenv").config({
 path: path.join(__dirname, "../.env")
});

//fonction du hashage
async function hashPassword(password) {
 return await bcrypt.hash(password, 10);
}

// compare entre le pswd normal et le pswd hashé
async function validatePassword(plainPassword, hashedPassword) {
 return await bcrypt.compare(plainPassword, hashedPassword);
}

//fonction d'inscription
exports.signup = async (req, res, next) => {
 try {
  const { Nom, Prenom ,Email, password,NomEntreprise, role ,Compte_verified} = req.body
  const hashedPassword = await hashPassword(password);
  const newUser = new User({
    Nom,
    Prenom,
    Email,
    password: hashedPassword,
    NomEntreprise,
    role: role

  });
  //le token general
  const accessToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
   expiresIn: "1d"
  });

  newUser.accessToken = accessToken; // rajouter le token a l'utilisateur
  await newUser.save();// envoie du user a la BDD
  res.json({
   data: newUser,
   accessToken
  })
 } catch (error) {
  next(error)
 }
}




//login

exports.login = async (req, res, next) => {
 try {
  const { Email, password } = req.body;
  const user = await User.findOne({ Email });
  if (!user) return next(new Error('Email does not exist'));
  //Password
  const validPassword = await validatePassword(password, user.password);
  if (!validPassword) return next(new Error('Password is not correct'))
  //token
  const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
   expiresIn: "1d"
  });
  await User.findByIdAndUpdate(user._id, { accessToken })
  res.status(200).json({
   data: { Email: user.Email, role: user.role },
   accessToken
  })
 } catch (error) {
  next(error)
 }
}

// Add this to the top of the file
const { roles } = require('../Role')

exports.grantAccess = function(action, resource) {
 return async (req, res, next) => {
  try {
   const permission = roles.can(req.user.Role)[action](resource);
   if (!permission.granted) {
    return res.status(401).json({
     error: "You don't have enough permission to perform this action"
    });
   }
   next()
  } catch (error) {
   next(error)
  }
 }
}
