const User = require('../model/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path')

//récupére la clef du token dans .env
require("dotenv").config({
 path: path.join(__dirname, "../.env")
});


//le crud de l'application
exports.getUsers = async (req, res, next) => {
 const users = await User.find({});
 res.status(200).json({
  data: users
 });
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
    const  permission=roles.can(req.res.locals.loggedInUser.role)[action](resource);
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
 //contient les information sur le user connecter
  const  user=roles.can(req.res.locals.loggedInUser.role)[action](resource);

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
