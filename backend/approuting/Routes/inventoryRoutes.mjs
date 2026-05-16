import { Router } from 'express';
import addInventory from '../../controller/Inventory/addInventory.mjs'
import deleteInventory from '../../controller/Inventory/deleteInventory.mjs'
import editInventory from '../../controller/Inventory/editInventory.mjs'


const inv_routes=Router();

inv_routes.post("/add", addInventory);

inv_routes.delete("/delete/:id", deleteInventory);

inv_routes.put("/edit/:id", editInventory);


export {inv_routes}