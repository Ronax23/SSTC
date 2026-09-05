import axios from 'axios';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useParams} from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import type { FormInputs, ItemRow } from '../../assets/Loading/Types.ts';

function Invoice({Usetype}: {Usetype: 'stock' | 'invoice' | 'custom'}) {
  const today = new Date().toISOString().split("T")[0];
  const { id } = useParams();
  const isStock = Usetype === 'stock';
  const edit = Boolean(id);
  const toastError = {
    position: 'top-right' as const,
    duration: 5000,
    style: {
      border: '1px dotted #7d089a',
      padding: '16px',
      color: '#7d089a',
    },
  };
  const toastSuccess = {...toastError, position: 'top-center' as const};
  const { register, handleSubmit,formState: { errors }, reset, setValue, getValues, watch,control } = useForm<FormInputs>({
    defaultValues: {
      invoiceType: 'inventory',
      invoiceDate: new Date().toISOString().split('T')[0],
      entryDate: new Date().toISOString().split('T')[0],
      productName: '',
      qty: 0,
      price: 0,
      buy_price: 0,
      mrp: 0,
      expiry: '',
      paymentMode: 'Cash',
      supplierName: '',
      entryNumber: '',
      customerName: '',
      customerGstin: '',
      challanNumber: '',
    },
  });

  const watchQty = watch('qty') || 0;
  const watchPrice = watch('price') || 0;
  const watchInvoiceType = watch('invoiceType');
  const watchCustomerGstin = watch('customerGstin') || '';

  const [taxType, setTaxType] = useState<'local' | 'interstate'>('local');
  const [paymentMode, setPaymentMode] = useState<string>('Cash');
  const [field, addField] = useState<ItemRow[]>([]);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [pendingDuplicate, setPendingDuplicate] = useState<any | null>(null);

  const hasGstin = Boolean(watchCustomerGstin.trim());

  const userSearch=useWatch({
    control,
    name:'customerMobileNo'
  })
 useEffect(() => {
    if (!userSearch || userSearch.trim() === '') return;
    const delayDebounceFn = setTimeout(() => {
      console.log('Hitting search query for:', userSearch);
      axios.get(`${import.meta.env.VITE_API_URL}/getUser/${userSearch}`).then((res)=>{
        if (res.data) {
          if (res.data.customerName) setValue('customerName', res.data.customerName);
          if (res.data.customerGstin) setValue('customerGstin', res.data.customerGstin);
          return true;
      }
    }).catch((error)=>{
      toast.error(error)
      return false;
    })
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [userSearch]);

  useEffect(() => {
    if (edit) {
      axios.get(`${import.meta.env.VITE_API}/${isStock ? 'stock' : 'invoice'}/${id}`, { withCredentials: true })
        .then((res) => {
          reset(res.data);
          if (res.data.items) addField(res.data.items);
          if (res.data.taxType) setTaxType(res.data.taxType);
          if (res.data.paymentMode) setPaymentMode(res.data.paymentMode);
        })
        .catch((err) => console.error('Error fetching data:', err));
    }
  }, [id, edit, isStock]);

  const onSubmitForm = async (formData: any) => {
    if (!isStock && watchInvoiceType === 'custom' && !formData.challanNumber?.trim()) {
      toast.error('Challan Inward Reference number is mandatory for Jobwork / Custom invoices.', toastError);
    }

    const payload = isStock ? {
      ...formData, items: field, paymentMode, totalStockValue: field.reduce((acc, curr) => acc + curr.qty * (curr.buy_price || 0), 0)
    } : {
      ...formData, items: field, taxType: hasGstin ? taxType : 'none', paymentMode,
      subtotal: field.reduce((acc, curr) => acc + curr.qty * (curr.price || 0), 0),
      cgst: hasGstin && taxType === 'local' ? (totalTax / 2) : 0,
      sgst: hasGstin && taxType === 'local' ? (totalTax / 2) : 0,
      igst: hasGstin && taxType === 'interstate' ? totalTax : 0,
      totalTax, grandTotal: subtotal + (hasGstin ? totalTax : 0)
    };
    axios[edit ? 'put' : 'post'](`${import.meta.env.VITE_API}/${isStock ? 'stock' : 'invoice'}/${edit ? `edit/${id}` : 'add'}`, payload, { withCredentials: true })
      .then((res) => {
        toast.success('Data saved successfully!', toastSuccess);
        console.log('Saved:', res.data);
      })
      .catch((err) => console.error('Submission error:', err));
  };

  const addInv = async () => {
    const productName = getValues('productName').trim();
    const qty = Number(getValues('qty')) || 0;

    if (!productName || qty <= 0) return toast.error('Enter valid product name and quantity.', toastError);
    if (!isStock && watchInvoiceType === 'custom' && !getValues('challanNumber')?.trim()) {
      return toast.error('Please provide a Challan Inward Reference before adding jobwork items.', toastError);
    }

    try {
      let price = Number(getValues('price')) || 0;
      let taxPercent = 0;

      if (!isStock && watchInvoiceType === 'inventory') {
        const { data } = await axios.get(`${import.meta.env.VITE_API}/inventory/check`, { params: { productName, qty }, withCredentials: true });
        if (!data.available || data.currentStock < qty) return toast.error(`Insufficient stock! Available: ${data.currentStock || 0}`, toastError);
        price = data.price || 0;
        taxPercent = data.taxPercent || 0;
        setValue('price', price);
      } else if (!isStock && watchInvoiceType === 'custom') {
        const { data } = await axios.post(`${import.meta.env.VITE_API}/challan/verify-and-deduct`, { challanNumber: getValues('challanNumber'), productName, qty }, { withCredentials: true });
        if (!data.success) return toast.error(data.message || 'Challan verification failed.', toastError);
      }

      const buy_price = Number(getValues('buy_price')) || 0;
      const mrp = Number(getValues('mrp')) || 0;
      const expiry = getValues('expiry') || '';

      if (editingItemId) {
        addField(field.map(i => i.id === editingItemId ? (isStock ? { ...i, productName, qty, buy_price, mrp, expiry } : { ...i, productName, qty, price, taxPercent }) : i));
        setEditingItemId(null);
      } else {
        const existing = field.find(i => i.productName.toLowerCase() === productName.toLowerCase());
        if (existing) {
          setPendingDuplicate({ productName, qty, price, taxPercent, buy_price, mrp, expiry, targetId: existing.id });
          return;
        }
        addField([...field, isStock ? { id: crypto.randomUUID(), productName, qty, buy_price, mrp, expiry } : { id: crypto.randomUUID(), productName, qty, price, taxPercent }]);
      }

      resetFieldValues();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Error adding item. Please try again.',toastError);
      console.error('Error adding item:', err);
    }
  };

  const resetFieldValues = () => {
    setValue('productName', '');
    setValue('qty', 0);
    setValue('price', 0);
    setValue('buy_price', 0);
    setValue('mrp', 0);
    setValue('expiry', '');
  };

  const subtotal = !isStock ? field.reduce((acc, curr) => acc + curr.qty * (curr.price || 0), 0) : 0;
  const totalTax = !isStock && hasGstin ? field.reduce((acc, curr) => acc + (curr.qty * (curr.price || 0) * (curr.taxPercent || 0)) / 100, 0) : 0;
  const grandTotal = subtotal + totalTax;

  return (
    <div className="container-fluid py-4">
          <Toaster />
      {pendingDuplicate && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50" style={{ zIndex: 1050 }}>
          <div className="card shadow-lg p-4 bg-white rounded border-0" style={{ maxWidth: '420px', width: '90%' }}>
            <h5 className="fw-bold text-danger mb-3">Duplicate Product Detected</h5>
            <p className="text-secondary mb-3"><strong>"{pendingDuplicate.productName}"</strong> is already listed.</p>
            <div className="d-flex flex-column gap-2">
              <button type="button" className="btn btn-primary" onClick={() => {
                addField(field.map(i => i.id === pendingDuplicate.targetId ? { ...i, qty: i.qty + pendingDuplicate.qty } : i));
                setPendingDuplicate(null); resetFieldValues();
              }}>Merge Quantity</button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => {
                addField([...field, { id: crypto.randomUUID(), ...pendingDuplicate }]);
                setPendingDuplicate(null); resetFieldValues();
              }}>Add as Separate Item</button>
              <button type="button" className="btn btn-light text-muted" onClick={() => setPendingDuplicate(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="row mb-4  bg-light rounded shadow-sm align-items-center">
          <div className="col-12 mb-2 d-flex justify-content-between">
            <h5 className="fw-bold text-primary mb-0">
              {isStock ? '📦 Stock Inward Entry' : `🧾 Invoice Sales (${watchInvoiceType} mode)`}
            </h5>
            <span className="badge bg-secondary fs-6 text-uppercase">{isStock ? 'stock' : 'invoice'}</span>
          </div>
          <hr className="my-2" />

          {isStock ? (
            <>
              <div className="col-lg-4 col-md-6 mb-3">
                <label className="form-label fw-bold">Supplier Name</label>
                <input type="text" className="form-control" {...register('supplierName', { required: isStock })} />
                {errors.supplierName && <span className="text-danger small">Supplier Name is required.</span>}
              </div>
              <div className="col-lg-4 col-md-6 mb-3">
                <label className="form-label fw-bold">Entry Reference No.</label>
                <input type="text" className="form-control" {...register('entryNumber', { required: isStock })} />
              </div>
              <div className="col-lg-4 col-md-6 mb-3">
                <label className="form-label fw-bold">Entry Date</label>
                <input type="date" className="form-control"  max={today} {...register('entryDate', { required: isStock })} />
              </div>
            </>
          ) : (
            <>
              <div className="col-lg-3 col-md-6 mb-3">
                <label className="form-label fw-bold">Invoice Type</label>
                <div className="d-flex gap-3">
                  <div><input type="radio" id="inv-inv" value="inventory" {...register('invoiceType')} /><label htmlFor="inv-inv" className="ms-1">Inventory</label></div>
                  <div><input type="radio" id="inv-custom" value="custom" {...register('invoiceType')} /><label htmlFor="inv-custom" className="ms-1">Jobwork</label></div>
                </div>
              </div>

              {watchInvoiceType === 'custom' && (
                <div className="col-lg-3 col-md-6 mb-3">
                  <label className="form-label fw-bold text-danger">Challan Ref *</label>
                  <input type="text" className="form-control border-danger" placeholder="Required for Jobwork" {...register('challanNumber', { required: watchInvoiceType === 'custom' })} />
                </div>
              )}

               <div className="col-lg-3 col-md-6 mb-3">
                <label className="form-label fw-bold">Customer Mobile No</label>
                <input type="text" className="form-control" {...register('customerMobileNo')} />
              </div>
              <div className="col-lg-3 col-md-6 mb-3">
                <label className="form-label fw-bold">Customer Name</label>
                <input type="text" className="form-control" {...register('customerName')} />
              </div>

              <div className="col-lg-3 col-md-6 mb-3">
                <label className="form-label fw-bold">Customer GSTIN</label>
                <input type="text" className="form-control text-uppercase" {...register('customerGstin')} />
              </div>

              {hasGstin && (
                <div className="col-lg-3 col-md-6 mb-3">
                  <label className="form-label fw-bold">Tax Base</label>
                  <div className="d-flex gap-3">
                    <div><input type="radio" id="tax-local" checked={taxType === 'local'} onChange={() => setTaxType('local')} /><label htmlFor="tax-local" className="ms-1">Intra-State</label></div>
                    <div><input type="radio" id="tax-interstate" checked={taxType === 'interstate'} onChange={() => setTaxType('interstate')} /><label htmlFor="tax-interstate" className="ms-1">Inter-State</label></div>
                  </div>
                </div>
              )}

              <div className="col-lg-3 col-md-6 mb-3">
                <label className="form-label fw-bold">Invoice Number</label>
                <input type="text" className="form-control" {...register('invoiceNumber', { required: !isStock })} />
              </div>

              <div className="col-lg-3 col-md-6 mb-3">
                <label className="form-label fw-bold">Invoice Date</label>
                <input type="date" className="form-control" {...register('invoiceDate', { required: !isStock })} />
              </div>
            </>
          )}
        </div>

        <div className={`row mb-3 p-3 border rounded align-items-end ${editingItemId ? 'bg-warning-subtle border-warning' : 'bg-white'}`}>
          <div className="col-12 d-flex justify-content-between align-items-center mb-2">
            <h6 className={`fw-bold ${editingItemId ? 'text-warning-emphasis' : 'text-secondary'}`}>
              {editingItemId ? 'Edit Item' : 'Quick Add Item'}
            </h6>
            {editingItemId && <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => { setEditingItemId(null); resetFieldValues(); }}>Cancel</button>}
          </div>

          <div className={isStock ? "col-md-3 mb-2" : "col-md-4 mb-2"}><label className="form-label">Product Name</label><input type="text" className="form-control" {...register('productName')} /></div>
          <div className={isStock ? "col-md-2 mb-2" : "col-md-2 mb-2"}><label className="form-label">Quantity</label><input type="number" className="form-control" {...register('qty')} /></div>

          {isStock ? (
            <>
              <div className="col-md-2 mb-2"><label className="form-label">Buy Price (₹)</label><input type="number" className="form-control" {...register('buy_price')} /></div>
              <div className="col-md-2 mb-2"><label className="form-label">MRP (₹)</label><input type="number" className="form-control" {...register('mrp')} /></div>
              <div className="col-md-3 mb-2"><label className="form-label">Expiry Date</label><input type="date" className="form-control" {...register('expiry')} /></div>
            </>
          ) : (
            <>
              <div className="col-md-2 mb-2"><label className="form-label">Price (₹)</label><input type="number" className="form-control" readOnly={watchInvoiceType === 'inventory'} {...register('price')} /></div>
              <div className="col-md-2 mb-2"><label className="form-label d-block text-secondary">Total</label><span className="fs-5 fw-bold text-success">₹{(watchQty * watchPrice).toFixed(2)}</span></div>
            </>
          )}

          <div className={isStock ? "col-12 mt-2" : "col-md-2 mb-2"}>
            <button type="button" className={`btn w-100 ${editingItemId ? 'btn-warning text-dark fw-bold' : 'btn-primary'}`} onClick={addInv}>
              {editingItemId ? 'Update Item' : 'Add Item'}
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8 col-12">
            <div className="table-responsive bg-white p-3 border rounded shadow-sm" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
              <table className="table table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>#</th><th>Product</th><th className="text-end">Qty</th>
                    {isStock ? <><th className="text-end">Buy Price</th><th className="text-end">MRP</th><th>Expiry</th></> : <><th className="text-end">Price</th>{hasGstin && <th className="text-end">Tax %</th>}<th className="text-end">Amount</th></>}
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {field.length === 0 ? (
                    <tr><td colSpan={isStock ? 7 : (hasGstin ? 7 : 6)} className="text-center text-muted py-4">No items added yet.</td></tr>
                  ) : (
                    field.map((item, index) => (
                      <tr key={item.id} className={editingItemId === item.id ? 'table-warning' : ''}>
                        <td>{index + 1}</td>
                        <td className="fw-semibold">{item.productName}</td>
                        <td className="text-end">{item.qty}</td>
                        {isStock ? (
                          <><td className="text-end">₹{item.buy_price || 0}</td><td className="text-end">₹{item.mrp || 0}</td><td>{item.expiry || 'N/A'}</td></>
                        ) : (
                          <><td className="text-end">₹{item.price || 0}</td>{hasGstin && <td className="text-end">{item.taxPercent || 0}%</td>}<td className="text-end fw-bold">₹{item.qty * (item.price || 0)}</td></>
                        )}
                        <td className="text-center">
                          <button type="button" className="btn btn-sm btn-outline-primary me-1" onClick={() => { setEditingItemId(item.id); setValue('productName', item.productName); setValue('qty', item.qty); isStock ? (setValue('buy_price', item.buy_price || 0), setValue('mrp', item.mrp || 0), setValue('expiry', item.expiry || '')) : setValue('price', item.price || 0); }}>Edit</button>
                          <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => { if (editingItemId === item.id) { setEditingItemId(null); resetFieldValues(); } addField(field.filter(i => i.id !== item.id)); }}>Delete</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-lg-4 col-12 mt-4 mt-lg-0">
            <div className="card p-3 shadow-sm border bg-light">
              <h5 className="fw-bold mb-3 border-bottom pb-2">Summary</h5>
              {isStock ? (
                <div className="d-flex justify-content-between mb-4"><span className="fs-5 fw-bold">Total Investment:</span><span className="fs-5 fw-bold text-success">₹{field.reduce((acc, curr) => acc + curr.qty * (curr.buy_price || 0), 0).toFixed(2)}</span></div>
              ) : (
                <>
                  <div className="d-flex justify-content-between mb-2"><span className="text-muted">Subtotal:</span><span className="fw-bold">₹{subtotal.toFixed(2)}</span></div>
                  {hasGstin && <div className="d-flex justify-content-between mb-2"><span className="text-muted">Tax ({taxType}):</span><span>₹{totalTax.toFixed(2)}</span></div>}
                  <hr />
                  <div className="d-flex justify-content-between mb-4"><span className="fs-5 fw-bold">Grand Total:</span><span className="fs-5 fw-bold text-success">₹{grandTotal.toFixed(2)}</span></div>
                </>
              )}

              <div className="mb-3">
                <label className="form-label fw-bold">Payment Mode</label>
                <div className="d-flex flex-wrap gap-2">
                  {['UPI', 'Cash', 'Card', 'Online', 'Cheque', 'Credit'].map((modeOpt) => (
                    <button key={modeOpt} type="button" onClick={() => setPaymentMode(modeOpt)} className={`btn btn-sm ${paymentMode === modeOpt ? 'btn-primary' : 'btn-outline-secondary'}`}>{modeOpt}</button>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn btn-success btn-lg w-100 mt-2">
                {edit ? 'Update Entry' : 'Save & Print'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Invoice;