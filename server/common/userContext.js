const User = require('../models/userModel');
const Item = require('../models/itemModel');

/**
 * Fetch all items and append them to the user data of the user with the name "admin".
 * @returns {Promise<string>} - The combined user data and items string.
 */
async function userContext() {
  try {
    // Fetch all items from the database, excluding _id and __v fields
    const items = await Item.find().select('-_id -__v').lean();
    const itemsString = JSON.stringify(items);

    // Fetch the user data for the user with the name "admin", excluding _id and __v fields
    const adminUser = await User.findOne({ name: 'admin' }).select('-_id -__v').lean();

    if (!adminUser) {
      throw new Error('Admin user not found');
    }

    // Combine user data and items string
    const combinedData = {
      user: adminUser,
      items: itemsString,
    };

    return JSON.stringify(combinedData);
  } catch (error) {
    console.error('Error fetching user context:', error);
    throw new Error('Failed to fetch user context');
  }
}

module.exports = { userContext };