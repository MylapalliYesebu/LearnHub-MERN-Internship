const express = require('express'); 
const router = express.Router();

const {
  getAllUsers,
  updateUserRole,
  deleteUser,
} = require('../controllers/userController');

const { protect, isAdmin } = require('../middleware/authMiddleware');

router.get('/', protect, isAdmin, getAllUsers);
router.put('/:id', protect, isAdmin, updateUserRole);
router.delete('/:id', protect, isAdmin, deleteUser);

module.exports = router;
