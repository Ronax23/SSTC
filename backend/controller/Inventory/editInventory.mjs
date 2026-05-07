import Inventory from "../model/inventory.mjs";

const editInventory = async (req, res) => {
    const { name, quantity, purchasePrice,MRP, description } = req.body;
    try {
        const inventoryItem = await Inventory.findOne({id: req.params.id});
        if (!inventoryItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }
        await Inventory.updateOne(
            { id: req.params.id },
            { 
                $set: {name:name,quantity:quantity, price: purchasePrice, description: description,MRP:MRP }
            }
        );
        await inventoryItem.save();
        res.status(200).json({ message: 'Inventory updated successfully' });
    } catch (error) {
        console.error('Error updating inventory:', error);
        res.status(500).json({ message: 'Failed to update inventory' });
    }
}

export default editInventory;