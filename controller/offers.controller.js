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
exports.getOffers= async (req, res, next) => {
 const offers= await Offer.find({});
 res.status(200).json({
  data: offers
 });
}

//Affichage
exports.getOffer = async (req, res, next) => {
 try {
  const offerId = req.params.offerId;
  console.log(req.params);
  const offer = await Offer.findById(offerId);
  if (!offer) return next(new Error('offer does not exist'));
   res.status(200).json({
   data: offer
  });
 } catch (error) {
  next(error)
 }
}

//Mise a jour
exports.updateOffer = async (req, res, next) => {
 try {
  const update = req.body
  const offerId = req.params.offerId;
  await Offer.findByIdAndUpdate(offerId, update);
  const offer = await Offer.findById(offerId)
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
  const offerId = req.params.offerId;
  await Offer.findByIdAndDelete(offerId);
  res.status(200).json({
   data: null,
   message: 'Offer has been deleted'
  });
 } catch (error) {
  next(error)
 }
}
