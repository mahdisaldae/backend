const mongoose = require('mongoose')
const Schema  = mongoose.Schema;


const OffreEmploiShema= new mongoose.Schema ({

  NumOffre: {
    type : Number,

  },
  IntituleOffre : {
    type: String,
    required: true
  },
  Datedebut : {
    type: Date,
    required: true
},
  DateFin:{
  type:Date,
  required: true
},
  Lieu : {
    type: String,
  required: true
},
  Description:{
    type:String
  },
   role: {
    type: String,
    default: 'admin',
    enum: [ "Recuiter", "admin"]
   }

}) ;

//creer un model
const OffreEmploiModel= mongoose.model('OffreEmploi',OffreEmploiShema);
module.exports =  OffreEmploiModel;
