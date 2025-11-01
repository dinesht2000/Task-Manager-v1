const Task = require("../models/Task");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//get all users (admin only), GET /api/users/ , access pricte admin

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "member" }).select("-password");
    const usersWithTaskCounts = await Promise.all(
      users.map(async (user) => {
        const pendingTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "Pending",
        });
        const inProgressTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "In Progress",
        });
        const completedTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "Completed",
        });

        return {
          ...user._doc,
          pendingTasks,
          inProgressTasks,
          completedTasks,
        };
      })
    );
    res.json(usersWithTaskCounts);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user= await User.findById(req.params.id).select("-password");
    if(!user) return res.status(404).json({message:"User not found"});
    res.json(user);


  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


module.exports = { getUsers, getUserById};
