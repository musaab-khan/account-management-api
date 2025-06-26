import { number } from 'joi';
import Address from '../models/Address.js';
import User from '../models/Users.js';

class AddressController {
        async create(req: any, res: any) {
            try{
                const {userId, location} = req.body; 
                const user = await User.findByPk(userId);
                if(!user){
                    return res.status(404).send({msg:"User not found"});
                }

                const newAddress = await Address.create({
                    userId:user.id,
                    location
                })

                console.log(newAddress);
                return res.status(201).send({ msg:"Address added Successfully", address: newAddress });
            }
            catch(err){
                res.sendStatus(500);
            }
        }

        async update(req: any, res: any) {
            try{
                const {addressId, userId, location} = req.body;
                const address = await Address.findByPk(addressId);

                if(!address){
                    return res.status(404).send({msg:"Address not found"});
                }

                const updatedAddress: any = await address.update({
                    id: address.id,
                    userId: address.userId,
                    location: location
                })

                console.log(updatedAddress);
                return res.status(200).send({ msg:"Address updated successfully", address: updatedAddress });
            }
            catch(err){
                res.sendStatus(500);
            }
        }

        async delete(req: any, res: any) {
            try{
                const {addressId} = req.body;
                const address = await Address.findByPk(addressId);

                if(!address){
                    return res.status(404).send({msg:"Address not found"});
                }

                await address.destroy();

                return res.status(200).send({ msg:"Address deleted successfully" });
            }
            catch(err){
                res.sendStatus(500);
            }
        }

       async read(req: any, res: any) {
            try {
                const { addressId } = req.body;

                if (!addressId) {
                    return res.status(400).send({ msg: "addressId is required" });
                }

                const address = await Address.findByPk(addressId);

                if (!address) {
                    return res.status(404).send({ msg: "Address not found" });
                }

                return res.status(200).send({ address });
            }
            catch (err) {
                console.error(err);
                return res.sendStatus(500);
            }
}

}

export default new AddressController();