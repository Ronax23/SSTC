import invoiceModel from "../../models/invoice.mjs";

const listInvoice=async(req,res)=>{
    const {id}=req.query;
    try{
                const invoices=await invoiceModel.find(!id?{}:{_id:id});

        if(!id)
        {
            res.status(200).json({message:"Invoice ID is required",errorcode:400});
        }
        else
        {
            res.status(200).json(invoices);
        }
    }
    catch(err){
        res.status(200).json({message:"Server error",error:err.message, status:500});       
    }
}

export default listInvoice;