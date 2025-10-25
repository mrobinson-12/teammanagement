"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// All user routes require authentication
router.use(auth_middleware_1.authenticateToken);
router.get('/', user_controller_1.getAllUsers);
router.get('/leaderboard', user_controller_1.getLeaderboard);
router.get('/:id', user_controller_1.getUserById);
router.patch('/profile', user_controller_1.updateProfile);
router.post('/award-points', (0, auth_middleware_1.requireRole)(['mentor']), user_controller_1.awardPoints);
exports.default = router;
