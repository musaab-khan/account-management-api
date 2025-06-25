import { Router } from "express";
import UserController from "../controllers/UserController.mjs";
import uploadPhoto from "../middleware/profilePhotoUpload.mjs";
import userSchema from "../middleware/userValidation.mjs";

const router = Router();

router.get('/api/users', UserController.getUsers);

router.post('/api/users', uploadPhoto.single('profilePhoto'), userSchema, UserController.create.bind(UserController));

router.post('/api/users/login', UserController.login.bind(UserController));

export default router;