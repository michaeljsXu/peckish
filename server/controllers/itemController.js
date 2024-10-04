const Item = require('../models/itemModel');
const SeenItem = require('../models/seenItemModel');

exports.getAllItems = async (req, res) => {
    try {
      const items = await Item.find();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch items" });
    }
  };
  
  exports.createItem = async (req, res) => {
    try {
      const { name, icon, expiry, tags, isFrozen, count } = req.body;
  
      // Check if the item name already exists in the SeenItem model
      const seenItem = await SeenItem.findOne({ name });
  
      if (!seenItem) {
        // If the item name doesn't exist, add it to the SeenItem model
        const newSeenItem = new SeenItem({
          name,
          icon,
          expiry,
          tags,
          isFrozen
        });
  
        await newSeenItem.save();
      }
  
      // Create a new item
      const newItem = new Item(req.body);
      await newItem.save();
      res.status(201).json(newItem);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Failed to create item" });
    }
  };

  exports.updateItemById = async (req, res) => {
    try {
      const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!updatedItem) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(400).json({ error: "Failed to update item" });
    }
  };
  
  exports.deleteItemById = async (req, res) => {
    try {
      const deletedItem = await Item.findByIdAndDelete(req.params.id);
      if (!deletedItem) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete item" });
    }
  };
  
  exports.getItemById = async (req, res) => {
    try {
      const item = await Item.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch item" });
    }
  };
  