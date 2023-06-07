const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.post('/', itemController.createItem);
router.get('/', itemController.getAllItems);
router.get('/:id', itemController.getSingleItem);
router.put('/:id', itemController.updateItem);
router.delete('/:id', itemController.deleteItem);

module.exports = router;
