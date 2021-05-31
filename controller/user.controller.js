const User = require('../model/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path')

//récupére la clef du token dans .env
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
  const { Nom, Prenom ,Email, password,NomEntreprise, role,Compte_verified } = req.body
  const hashedPassword = await hashPassword(password);
  const newUser = new User({
    Nom,
    Prenom,
    Email,
    password: hashedPassword,
    NomEntreprise,
    role: role,
    Compte_verified:Compte_verified

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

//le crud de l'application

exports.getUsers = async (req, res, next) => {
 const users = await User.find({});
 res.status(200).json({
  data: users
 })
}

//Affichage
exports.getUser = async (req, res, next) => {
 try {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  if (!user) return next(new Error('User does not exist'));
   res.status(200).json({
   data: user
  });
 } catch (error) {
  next(error)
 }
}

//Mise a jour
exports.updateUser = async (req, res, next) => {
 try {
  const update = req.body
  const userId = req.params.userId;
  await User.findByIdAndUpdate(userId, update);
  const user = await User.findById(userId)
  res.status(200).json({
   data: user,
   message: 'User has been updated'
  });
 } catch (error) {
  next(error)
 }
}

exports.deleteUser = async (req, res, next) => {
 try {
  const userId = req.params.userId;
  await User.findByIdAndDelete(userId);
  res.status(200).json({
   data: null,
   message: 'User has been deleted'
  });
 } catch (error) {
  next(error)
 }
}

// middleware

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

//fitlrer les acces
exports.allowIfLoggedin = async (req, res, next) => {
 try {
  const user = res.locals.loggedInUser; //contient les information sur le user connecter
  if (!user)
   return res.status(401).json({
    error: "You need to be logged in to access this route"
   });
   req.user = user;
   next();
  } catch (error) {
   next(error);
  }
}
