const User = require('../models/User');

// Get all users (Admin only)
// GET /api/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// Update a user's role (Admin only)
// PUT /api/users/:id
const updateUserRole = async (req, res) => {
  try {
    const { type } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Block changing own role
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(403).json({ message: "You can't change your own role" });
    }

    // Block assigning or modifying admin roles
    if (user.type === 'admin' || type === 'admin') {
      return res.status(403).json({ message: "You can't modify admin roles" });
    }

    user.type = type;
    await user.save();

    res.json({ message: 'User role updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user role' });
  }
};

// Delete a user (Admin only)
// DELETE /api/users/:id
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Block deleting self or another admin
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(403).json({ message: "You can't delete yourself" });
    }

    if (user.type === 'admin') {
      return res.status(403).json({ message: "You can't delete other admins" });
    }

    await user.deleteOne();

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user' });
  }
};

module.exports = {
  getAllUsers,
  updateUserRole,
  deleteUser,
};
