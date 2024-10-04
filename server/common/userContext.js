const User = require('../models/userModel');

/**
 * Fetch all items and append them to the user data of the user with the name "admin".
 * @returns {Promise<string>} - The combined user data and items string.
 */
async function userContext() {
  try {
    // Fetch the user data for the user with the name "admin", excluding _id and __v fields
    const adminUser = await User.findOne({ name: 'admin' }).select('-_id -__v').lean();

    if (!adminUser) {
      throw new Error('Admin user not found');
    }

    return JSON.stringify(adminUser);
  } catch (error) {
    console.error('Error fetching user context:', error);
    throw new Error('Failed to fetch user context');
  }
}

module.exports = { userContext };