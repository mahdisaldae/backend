// server/models/userModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  Nom: {
   type: String,
   required: true,
   trim: true

  },
 Prenom: {
   type: String,
   required: true,
   trim: true
  },
 Email: {
  type: String,
  required: true,
  unique:true,
  trim: true
 },
 password: {
  type: String,
  required: true
 },
 NomEntreprise: {
  type: String

 },
 role: {
  type: String,
  default: 'Jobseeker',
  enum: ["Jobseeker", "Recuiter", "admin"]
 },
Compte_verified: {
   type: Boolean,
  default: false,
 },
 accessToken: {
  type: String

 }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
