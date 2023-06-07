const Item = require('../models/item');

exports.createItem = (req, res) => {
  const newItem = req.body;

  Item.create(newItem)
    .then(() => {
      res.status(201).send('Item created successfully');
    })
    .catch((error) => {
      console.error('Failed to create item:', error);
      res.status(500).send('Failed to create item');
    });
};

exports.getAllItems = (req, res) => {
  Item.find()
    .then((items) => {
      res.send(items);
    })
    .catch((error) => {
      console.error('Failed to fetch items:', error);
      res.status(500).send('Failed to fetch items');
    });
};

exports.getSingleItem = (req, res) => {
  const itemId = req.params.id;

  Item.findById(itemId)
    .then((item) => {
      if (!item) {
        res.status(404).send('Item not found');
      } else {
        res.send(item);
      }
    })
    .catch((error) => {
      console.error('Failed to fetch item:', error);
      res.status(500).send('Failed to fetch item');
    });
};

exports.updateItem = (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;

  Item.findByIdAndUpdate(itemId, updatedItem)
    .then(() => {
      res.send('Item updated successfully');
    })
    .catch((error) => {
      console.error('Failed to update item:', error);
      res.status(500).send('Failed to update item');
    });
};

exports.deleteItem = (req, res) => {
  const itemId = req.params.id;

  Item.findByIdAndDelete(itemId)
    .then(() => {
      res.send('Item deleted successfully');
    })
    .catch((error) => {
      console.error('Failed to delete item:', error);
      res.status(500).send('Failed to delete item');
    });
};
