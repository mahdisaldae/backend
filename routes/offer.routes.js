const express = require('express')
const router = express.Router();



const offreEmploiCont= require('../controller/offers.controller');

router.post('/AdOffer',offreEmploiCont.Addoffer);

router.get('/offer/:offerId', offreEmploiCont.allowIfLoggedin, offreEmploiCont.getOffer);

router.get('/offers', offreEmploiCont.allowIfLoggedin, offreEmploiCont.grantAccess('readAny', 'profile'), offreEmploiCont.getOffers);

router.put('/offer/:offerId', offreEmploiCont.allowIfLoggedin, offreEmploiCont.grantAccess('updateAny', 'profile'), offreEmploiCont.updateOffer);

router.delete('/offer/:offerId',offreEmploiCont.allowIfLoggedin, offreEmploiCont.grantAccess('deleteAny', 'profile'),offreEmploiCont.deleteOffer);


module.exports = router;
