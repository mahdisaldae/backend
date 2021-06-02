const Offer= require('../model/offer.model');


//add offer
exports.Addoffer = async (req, res, next) => {
 try {
  const { NumOffre, IntituleOffre ,Datedebut, DateFin ,Lieu, Description,role} = req.body
  const newOffer = new Offer({
    NumOffre,
    IntituleOffre,
    Datedebut,
    DateFin,
    Lieu,
    Description,
    role: role

  });
//Testing role

  await newOffer.save();// envoie du user a la BDD
  res.json({
   data: newOffer
  })
 } catch (error) {
  next(error)
 }
}



//le crud de l'offre
exports.getOffer= async (req, res, next) => {
 const offer= await Offer.find({});
 res.status(200).json({
  data: offer
 });
}

//Affichage
exports.getOffers = async (req, res, next) => {
 try {
  const OffersId = req.params.OffersId;
  const offers = await Offer.findById(OffersId);
  if (!offers) return next(new Error('User does not exist'));
   res.status(200).json({
   data: offers
  });
 } catch (error) {
  next(error)
 }
}

//Mise a jour
exports.updateOffer = async (req, res, next) => {
 try {
  const update = req.body
  const OffersId = req.params.OffersId;
  await Offer.findByIdAndUpdate(OffersId, update);
  const offer = await Offer.findById(OffersId)
  res.status(200).json({
   data: offer,
   message: 'offer has been updated'
  });
 } catch (error) {
  next(error)
 }
}
//Delete offer
exports.deleteOffer = async (req, res, next) => {
 try {
  const OffersId = req.params.OffersId;
  await Offer.findByIdAndDelete(OffersId);
  res.status(200).json({
   data: null,
   message: 'Offer has been deleted'
  });
 } catch (error) {
  next(error)
 }
}

// Add this to the top of the file
const { roles } = require('../Role')

exports.grantAccess = function(action, resource) {
 return async (req, res, next) => {
  try {
    const  permission=roles.can(req.res.locals.loggedInOffer.role)[action](resource);
   if (!permission.granted) {
    return res.status(401).json({
     error: "You don't have enough permission to perform this action OFFRE"
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
