import AddressController from "../controllers/AddressController";
import { Router } from "express";
import { checkPermission } from "../middleware/checkPermission";
import authenticateToken from "../middleware/authenticateToken";

const router = Router();

router.use(authenticateToken);
router.use(checkPermission);

router.post("/create_address", AddressController.create);
router.post("/update_address", AddressController.update);
router.post("/delete_address", AddressController.delete);
router.post("/read_address", AddressController.read);

export default router;