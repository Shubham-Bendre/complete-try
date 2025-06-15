const {
    createVaccineMaster,
    getAllVaccineMasters,
    getVaccineMasterById,
    deleteVaccineMasterById,
    updateVaccineMasterById
} = require('../Controllers/VaccineMasterController');

const router = require('express').Router();

router.get('/', getAllVaccineMasters);
router.get('/:id', getVaccineMasterById);
router.delete('/:id', deleteVaccineMasterById);
router.put('/:id', updateVaccineMasterById);
router.post('/', createVaccineMaster);

module.exports = router; 