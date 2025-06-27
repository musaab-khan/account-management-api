import { Router } from "express";
import UserController from "../controllers/UserController";
import uploadPhoto from "../middleware/profilePhotoUpload";
import userValidation from "../middleware/userValidation";
import authenticateToken from "../middleware/authenticateToken";

const router = Router();

router.post('/register', uploadPhoto.single('profilePhoto'), UserController.create);
router.post('/login', UserController.login.bind(UserController));
router.get('/', UserController.getUsers);

router.use(authenticateToken);

router.post('/update', uploadPhoto.single('profilePhoto'), UserController.updateUser);

export default router;