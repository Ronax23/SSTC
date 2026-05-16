import { Router } from 'express';
import invoicesCreate from '../../controller/Invoice/invoicesCreate.mjs'
import EditInvoice from '../../controller/Invoice/editInvoice.mjs';
import listInvoice from '../../controller/Invoice/listInvoice.mjs'
const invoiceRoute=Router()

invoiceRoute.post("/add", invoicesCreate);

invoiceRoute.get("/view",listInvoice);

invoiceRoute.put("/edit/:id",EditInvoice)

export {invoiceRoute}