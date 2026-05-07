import Inventory from "../../models/inventory.mjs"; 

const deleteInventory = async (req, res) => {
    const { id } = req.query;
    if (!id) {
        return res.status(200).json({ message: 'Inventory ID is required', status: 400 });
    }
    try {
        const inventoryItem = await Inventory.deleteOne({ id: id });
        res.status(200).json(inventoryItem.deletedCount > 0 ? { message: 'Inventory item deleted successfully',status:200 } : { message: 'Inventory item not found', status: 404 });
    } catch (error) {
        console.error('Error deleting inventory item:', error);
        res.status(200).json({ message: 'Failed to delete inventory item', status: 500 });
    }
}

export default deleteInventory;