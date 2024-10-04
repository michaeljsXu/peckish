const Item = require('models/itemModel'); // Adjust the path as necessary

const checkAndDeleteExpiredItems = async (req, res, next) => {
  try {
    const currentTime = new Date();
    await Item.deleteMany({ expiry: { $lt: currentTime } });
    next();
  } catch (err) {
    res.status(500).json({ message: 'Error checking for expired items', error: err.message });
  }
};

module.exports = checkAndDeleteExpiredItems;