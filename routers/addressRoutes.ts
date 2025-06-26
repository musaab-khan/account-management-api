import AddressController from "../controllers/AddressController";
import { Router } from "express";

const router = Router();


router.post("/create_address", AddressController.create);
router.post("/update_address", AddressController.update);
router.post("/delete_address", AddressController.delete);
router.post("/read_address", AddressController.read);

export default router;