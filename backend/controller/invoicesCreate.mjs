import invoiceModel from "../models/invoice.mjs";

const invoiceCreate=    async(req,res)=>{
    const  {item}=req.body;
    console.log(item);
    let GrandTotal=0;
    const dat=item.map(i=>{
        let subTotal=i.price*i.qty;
        let taxAmount=(subTotal*i.tax)/100;
        subTotal+=taxAmount;
        GrandTotal+=subTotal;
        return {
            item:i.product||"Default",
            quantity:i.qty,
            tax:taxAmount,
            price:i.price,
            subtotal:subTotal

        }   
    })
    const bill=await invoiceModel.findOne().sort({invoiceNumber:-1}).select("invoiceNumber");
    const billno=bill?bill.invoiceNumber+1:1;
    console.log(dat);
    const newBill=new invoiceModel({items:dat,customerName:req.body.customerName,invoiceNumber:billno,grandAmount:GrandTotal});
   await newBill.save();
    res.status(200).json(dat);
}

export default invoiceCreate;