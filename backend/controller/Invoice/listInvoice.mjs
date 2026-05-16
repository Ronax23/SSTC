import invoiceModel from "../../models/invoice.mjs";

const listInvoice=async(req,res)=>{
    const {id}=req.params;
      const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    try{
        const invoices=await invoiceModel.find(!id?{}:{_id:id}).sort({createdAt:-1}).skip((page - 1) * limit).limit(limit);
        res.status(200).json(invoices.length>0?{message:"Invoice(s) found", status:200, invoices}:{message:"No invoice found", status:500});
    }
    catch(err){
        res.status(200).json({message:"Server error",error:err.message, status:500});       
    }
}

export default listInvoice;