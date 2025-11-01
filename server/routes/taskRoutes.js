const express=require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { getDashboardData, getUserDashboardData, getTasks, getTaskById, createTask, updateTask, deleteTask, updateTaskStatus, updateTaskChecklist } = require("../controllers/taskController");

const router=express.Router();

router.use(protect);

router.get("/dashboard-data",getDashboardData);
router.get("/user-dashboard-data",getUserDashboardData);
router.get("/",getTasks); // get all task
router.get("/:id",getTaskById); //get task by ID
router.post("/",adminOnly,createTask);
router.put("/:id",updateTask);
router.delete("/:id",adminOnly,deleteTask);
router.put("/:id/status",updateTaskStatus);
router.put("/:id/todo",updateTaskChecklist);

module.exports=router;