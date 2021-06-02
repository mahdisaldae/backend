const express = require('express')
const router = express.Router();



const offreEmploiCont= require('../controller/offers.controller');


router.post('/AdOffer',offreEmploiCont.Addoffer);

router.get('/offer/:offerId', offreEmploiCont.getOffer);

router.get('/offers',offreEmploiCont.getOffers);

router.patch('/upoffer/:offerId', offreEmploiCont.updateOffer);

router.delete('/offer/:offerId',offreEmploiCont.deleteOffer);

module.exports = router;
