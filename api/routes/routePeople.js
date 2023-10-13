const { Router } = require('express');
const PeopleController = require('../controllers/PeopleController');

const router = Router();

router.get('/people', PeopleController.getActivePeople);
router.get('/people/all', PeopleController.getAllPeople);
router.get('/people/:id', PeopleController.getPersonById);
router.post('/people', PeopleController.personRegister);
router.put('/people/:id', PeopleController.updatePerson);
router.delete('/people/:id', PeopleController.deletePerson);
router.post('/people/:id', PeopleController.restorePerson);

// Registration routes

router.get('/people/registrations/:id', PeopleController.getRegistrationById);
router.post('/people/:id/registrations', PeopleController.createRegistration);
router.put('/people/registrations/:id', PeopleController.updateRegistration);
router.delete('/people/registrations/:id', PeopleController.deleteRegistration);
router.post('/people/registrations/:id', PeopleController.restoreRegistration);

module.exports = router;