import Inventory from '../../models/Inventory.mjs';
const addStock = async (req, res) => {
    const{name, quantity,purchasePrice,MRP,Metric, description} = req.body;
    try {
        const names = await Inventory.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
        if (names) {
    await Inventory.updateOne(
        { name: name },
        { 
            $inc: { quantity: quantity },
            $set: { price: purchasePrice, description: description }
        }
    );
}
     if (!names) {
        await Inventory.insert({
            name: name,
            quantity: quantity,
            price: purchasePrice,
            description: description,
            MRP:MRP,
            Metric:Metric
        });
    } 
        await Inventory.Save();
        res.status(200).json({ message: 'Stock added successfully' });
    } catch (error) {
        console.error('Error adding stock:', error);
        res.status(500).json({ message: 'Failed to add stock' });
    }
}

export default addStock;