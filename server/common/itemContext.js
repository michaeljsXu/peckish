const Item = require('../models/itemModel');

/**
 * Fetch all items and append them to the user data of the user with the name "admin".
 * @returns {Promise<string>} - The combined user data and items string.
 */
async function itemContext() {
  try {
    // Fetch all items from the database, excluding _id and __v fields
    const items = await Item.find().select('-_id -__v').lean();
    const itemsString = JSON.stringify(items);

    return itemsString;
  } catch (error) {
    console.error('Error fetching user context:', error);
    throw new Error('Failed to fetch user context');
  }
}

module.exports = { itemContext };