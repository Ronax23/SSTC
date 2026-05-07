import Inventory from "../../model/inventory.mjs"; 

const deleteInventory = async (req, res) => {
    try {
        const inventoryItem = await Inventory.findOne({id: req.params.id});
        if (!inventoryItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }
        await Inventory.deleteOne({ id: req.params.id });
        await inventoryItem.save();
        res.status(200).json({ message: 'Inventory item deleted successfully', status: 200 });
    } catch (error) {
        console.error('Error deleting inventory item:', error);
        res.status(200).json({ message: 'Failed to delete inventory item', status: 500 });
    }
}

export default deleteInventory;