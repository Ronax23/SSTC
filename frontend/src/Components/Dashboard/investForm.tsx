import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import gsap from 'gsap';

// Import Swiper styles
import 'swiper/css';
//@ignore
import 'swiper/css/navigation';

interface AssetType {
  id: string;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
}

const ASSET_TYPES: AssetType[] = [
  { id: 'RecurringDeposit', label: 'RecurringDeposit', icon: 'bi-wallet2', color: '#0d6efd', bgColor: '#e7f1ff' },
  { id: 'FixedDeposit', label: 'Fixed deposit', icon: 'bi-lock', color: '#fd7e14', bgColor: '#fff4e6' },
  { id: 'MUTUAL_FUND', label: 'Mutual funds', icon: 'bi-pie-chart', color: '#6f42c1', bgColor: '#f3ebf7' },
  { id: 'STOCK', label: 'Stocks', icon: 'bi-graph-up-arrow', color: '#198754', bgColor: '#e8f5e9' },
  { id: 'BOND', label: 'BOND', icon: 'bi-currency-dollar', color: '#0d6efd', bgColor: '#e7f1ff' },
  { id: 'COINS', label: 'Gold / Silver', icon: 'bi-gem', color: '#fd7e14', bgColor: '#fff4e6' },
  { id: 'CRYPTO', label: 'Crypto', icon: 'bi-currency-bitcoin', color: '#d63384', bgColor: '#fce4ec' },
];

interface FormValues {
  assetType: string;
  investmentDate: Date;
  notes: string;
  avgBuyPrice:number;
  invested:number;
  // Shared Duration
  years: number;
  month: number;
  days: number;
  
  // Specific Fields
  bankName: string;
  investedAmount: number;
  interestRate: number;
  payoutFrequency: string;
  monthlyInstallment:number;
  
  bondName:string;

  fundName: string;
  category: string;
  nav: number;
  
  companyName: string;
  purchasePrice: number;
  quantity: number;
  
  coinType: string;
  weightInGrams: number;
  price: number;
  purityKarat: number;
}

// Helper to calculate maturity date safely
const calculateMaturityDate = (startDate: Date | undefined, years: number = 0, months: number = 0, days: number = 0) => {
  if (!startDate) return null;
  const date = new Date(startDate);
  date.setFullYear(date.getFullYear() + Number(years || 0));
  date.setMonth(date.getMonth() + Number(months || 0));
  date.setDate(date.getDate() + Number(days || 0));
  return date;
};

function investForm() {
   const {register,handleSubmit,setValue,formState: { errors },watch,unregister } = useForm<FormValues>({});
  const formRef = useRef<HTMLDivElement>(null);
  const [notesLength, setNotesLength] = useState<number>(0);
   const [showCalendar, setShowCalendar] = useState(false);
    const dates = watch('investmentDate');
    const yrs = watch('years');
    const mos = watch('month');
    const dys = watch('days');

  // ✅ LIVE PREVIEW CALCULATION
  const maturityDate = (dates && (yrs || mos || dys)) 
    ? calculateMaturityDate(dates, yrs, mos, dys) 
    : null;
const selectedAsset = watch('assetType', ASSET_TYPES[0].id); // Default to the first asset type
  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [selectedAsset]);

  const onSubmit = (data: FormValues) => {
    console.log('Submitted Asset Data:', data);
    alert('Asset added successfully!');
  };
  const stockqty=watch('quantity')
  const stockPurchase=watch('purchasePrice')
  const mfNAV=watch('nav')
  const mfInvest=watch('investedAmount')
  const commonPayoutField=()=>{
    return(
       <>
     <label htmlFor="payoutFrequency" className="form-label text-muted small">
          How often would you like to receive returns?
        </label>
        <select 
          id="payoutFrequency" 
          className="form-select"
          {...register('payoutFrequency')}
        >
          <option value="Monthly">Monthly</option>
          <option value="Quarterly">Quarterly</option>
          <option value="Half-Yearly">Half-Yearly</option>
          <option value="Annually">Annually</option>
          <option value="At Maturity">At Maturity</option>
        </select>
        </>
  )}

  const bondsField=()=>{
    return(

<div className="row">
<label className="form-label fw-semibold small" htmlFor="bank">Enter Bank Name</label>
<input className='form-control text-uppercase rounded-3' placeholder="e.g. Banco do Nordeste" type="text" {...register('bondName',{required:true})}/>
{errors.bondName && <p className='text-danger'>Bank Name Required</p>}
<label htmlFor="Invested Amount">Enter Invested Amount</label>
<input type="number" {...register('investedAmount',{required:true,minLength:0})} />
{errors.investedAmount?.type==='required' && <p className='text-danger'>Enter Amount</p>}
{errors.investedAmount?.type==='minLength' && <p className='text-danger'>Amount Should Be More Than 0</p>}
<label htmlFor="interest-rate" className='form-control text-uppercase rounded-3'>Enter Interest Rate</label>
<input type='number' placeholder='5%' {...register('interestRate',{required:true, minLength:0})} />
{errors.interestRate?.type==='minLength' && <p className='text-danger'>Interest Rate Should Be More Than 0</p>}
{errors.interestRate?.type==='required' && <p className='text-danger'>Interest Rate Required</p>}
<div className="col-6">
  <label htmlFor="txt">Enter Duration</label>
  <div className="row">
    <div className="col-4">
      <label htmlFor="year">Years</label>
      <input type="number" placeholder='Years'{...register('years',{required:false})}/>
    </div>
    <div className="col-4">
       <label htmlFor="year">Month</label>
      <input type="number" placeholder='Month'{...register('month',{required:false,min:1,max:12})}/>
    {(errors.month?.type==='min'||errors.month?.type==='max')&& <p className='text-danger'>Month Range is 1-12</p>}
    </div>
    <div className="col-4">
       <label htmlFor="year">Days</label>
      <input type="number" placeholder='Day'{...register('days',{required:false,min:1,max:31})}/>
        {(errors.days?.type==='min'||errors.days?.type==='max')&& <p className='text-danger'>Days Range is 1-31</p>}
    </div>
  </div>
  <p>{maturityDate ? format(maturityDate, 'PPP') : 'Select duration'}</p>
</div>

<div className="col-6">
  {selectedAsset=='fixed-deposit' &&commonPayoutField()}
</div>
</div>

    )
  }
  const cryptoFields=()=>{
    return(
      <div className="row">
        <div className="col-6">
          <label htmlFor="">Crypto Name</label>
          <input type="text" placeholder='Nvidia' {...register('coinType',{required:true})} />
          {errors.coinType && <p className='text-danger'>Enter Coin Name</p>}
        </div>
        <div className="col-6">
          <label htmlFor="">Invested Price</label>
          <input type="number" placeholder='100' {...register('avgBuyPrice',{required:true,min:99})}/>
          {errors.avgBuyPrice?.type==='required' &&<p className='text-danger'>Enter Invested Amount</p>}
          {errors.avgBuyPrice?.type==='min' &&<p className='text-danger'>Enter Valid Amount</p>}
        </div>
       
        <div className="col-6">
          <label htmlFor="">Invested</label>
          <input type="number"  id="qty" placeholder='10.1' {...register('invested',{required:true,min:0})} />
          {errors.invested?.type=='required' && <p className='text-danger'>Invested Amount Required</p>}
          {errors.invested?.type=='min' && <p className='text-danger'>Enter Valid Amount</p>}
        </div>
        <div className="col-6">
          <p>Amount Invested {stockqty*stockPurchase}</p>
        </div>
      </div>
    )
  }


const coinField=()=>{return(
  <div className="row">
    <div className="col-6">
      <label htmlFor="">Select Coin Type</label>
        <select
    id="coinType"
    className="form-select"
    {...register('coinType')}
  >
    <option value="GOLD">GOLD</option>
    <option value="SILVER">SILVER</option>
    <option value="PLATINUM">PLATINUM</option>
  </select>
    </div>
    <div className="col-6">
      <label htmlFor="">Weight In Grams</label>
      <input type="number" placeholder='1g' {...register('weightInGrams',{required:true,min:0})} />
      {errors.weightInGrams?.type=='required' && <p className='text-danger'>Cannot Set Field Empty</p>}
      {errors.weightInGrams?.type=='min' && <p className='text-danger'>Should More Than 0</p>}
    </div>
    <div className="col-6">
      <label htmlFor="">Price Per Gram</label>
      <input type="number" placeholder='150' {...register('price',{required:true})}/>
      {errors.price && <p className='text-danger'>Enter Price</p>}
    </div>
    <div className="col-6">
      <label htmlFor="">Purity</label>
      <input type="number" placeholder='999' {...register('purityKarat')}/>
    </div>
  </div>

)}
const   bankFields=()=>{
return(<div className="row">
<label className="form-label fw-semibold small" htmlFor="bank">Enter Bank Name</label>
<input className='form-control text-uppercase rounded-3' placeholder="e.g. Banco do Nordeste" type="text" {...register('bankName',{required:true})}/>
{errors.bankName && <p className='text-danger'>Bank Name Required</p>}
<label htmlFor="Invested Amount">Enter Invested Amount</label>
<input type="number" {...register('investedAmount',{required:true,minLength:0})} />
{errors.investedAmount?.type==='required' && <p className='text-danger'>Enter Amount</p>}
{errors.investedAmount?.type==='minLength' && <p className='text-danger'>Amount Should Be More Than 0</p>}
<label htmlFor="interest-rate" className='form-control text-uppercase rounded-3'>Enter Interest Rate</label>
<input type='number' placeholder='5%' {...register('interestRate',{required:true, minLength:0})} />
{errors.interestRate?.type==='minLength' && <p className='text-danger'>Interest Rate Should Be More Than 0</p>}
{errors.interestRate?.type==='required' && <p className='text-danger'>Interest Rate Required</p>}
<div className="col-6">
  <label htmlFor="txt">Enter Duration</label>
  <div className="row">
    <div className="col-4">
      <label htmlFor="year">Years</label>
      <input type="number" placeholder='Years'{...register('years',{required:false})}/>
    </div>
    <div className="col-4">
       <label htmlFor="year">Month</label>
      <input type="number" placeholder='Month'{...register('month',{required:false,min:1,max:12})}/>
    {(errors.month?.type==='min'||errors.month?.type==='max')&& <p className='text-danger'>Month Range is 1-12</p>}
    </div>
    <div className="col-4">
       <label htmlFor="year">Days</label>
      <input type="number" placeholder='Day'{...register('days',{required:false,min:1,max:31})}/>
        {(errors.days?.type==='min'||errors.days?.type==='max')&& <p className='text-danger'>Days Range is 1-31</p>}
    </div>
  </div>
  <p>{maturityDate ? format(maturityDate, 'PPP') : 'Select duration'}</p>
</div>

<div className="col-6">
  {selectedAsset=='fixed-deposit' &&commonPayoutField()}
  {selectedAsset=='fixed-deposit' &&(
   <>
    <label>Monthly Installments</label>
    <input type="number" placeholder='100' {...register('monthlyInstallment',{required:true,min:99})}/>
    {errors.monthlyInstallment?.type==='required' && <p>Enter Installment Amount</p>}
    {errors.monthlyInstallment?.type==='min' && <p>Invalid Installment Amount</p>}
</>
  )}
</div>
</div>
)
  }

  const mutualFundsFields=()=>{
    return(
      <div className="row">
        <div className="col-6">
          <label htmlFor="">Fund Name</label>
          <input type="text" placeholder='Enter Fund Name' {...register('fundName',{required:true})} />
          {errors.fundName && <p className='text-danger'>Enter Fund Name</p>}
        </div>
        <div className="col-6">
          <label htmlFor="">Invested Amount</label>
          <input type="number" placeholder='100' {...register('investedAmount',{required:true,min:99})}/>
          {errors.investedAmount?.type==='required' &&<p className='text-danger'>Enter Invested Amount</p>}
          {errors.investedAmount?.type==='min' &&<p className='text-danger'>Enter Valid Amount</p>}
        </div>
        <div className="col-6">
           <label htmlFor="category" className="form-label text-muted small">
    Fund Category
  </label>
  <select
    id="category"
    className="form-select"
    {...register('category')}
  >   
    <option value="Equity">Equity</option>
    <option value="Hybrid">Hybrid</option>
    <option value="ELSS">ELSS</option>
    <option value="Debt">Debt</option>
  </select>
        </div>
        <div className="col-6">
          <label htmlFor="">NAV Value</label>
          <input type="text" id="nav" placeholder='10.1' {...register('nav',{required:true,min:0})} />
          {errors.nav?.type=='required' && <p className='text-danger'>NAV Value Required</p>}
          {errors.nav?.type=='min' && <p className='text-danger'>Enter Valid NAV Value</p>}
        </div>
        <p>Units {mfNAV*mfInvest}</p>
      </div>
    )
  }
  const stocksFields=()=>{
    return(
      <div className="row">
        <div className="col-6">
          <label htmlFor="">Company Name</label>
          <input type="text" placeholder='Nvidia' {...register('companyName',{required:true})} />
          {errors.companyName && <p className='text-danger'>Enter Company Name</p>}
        </div>
        <div className="col-6">
          <label htmlFor="">Purchase Price</label>
          <input type="number" placeholder='100' {...register('purchasePrice',{required:true,min:99})}/>
          {errors.purchasePrice?.type==='required' &&<p className='text-danger'>Enter Invested Amount</p>}
          {errors.purchasePrice?.type==='min' &&<p className='text-danger'>Enter Valid Amount</p>}
        </div>
       
        <div className="col-6">
          <label htmlFor="">Quantity</label>
          <input type="number"  id="qty" placeholder='10.1' {...register('quantity',{required:true,min:0})} />
          {errors.quantity?.type=='required' && <p className='text-danger'>Quantity Required</p>}
          {errors.quantity?.type=='min' && <p className='text-danger'>Enter Valid Quantity</p>}
        </div>
        <div className="col-6">
          <p>Amount Invested {stockqty*stockPurchase}</p>
        </div>
      </div>
    )
  }
  const handleAssetSelect = (assetId: string) => {
    setValue('assetType', assetId);
  };

  const activeAssetLabel = ASSET_TYPES.find((a) => a.id === selectedAsset)?.label.toLowerCase() || 'asset';

  return (
    <div className="container py-4 overflow-hidden">
      <div className="card shadow-sm border-0 rounded-4 p-4 bg-white ">
        <form onSubmit={handleSubmit(onSubmit)}>
          
          {/* STEP 1: Choose asset type */}
          <div className="mb-4">
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge rounded-circle bg-success d-flex align-items-center justify-content-center" style={{ width: 28, height: 28 }}>
                1
              </span>
              <h5 className="mb-0 fw-bold">Choose asset type</h5>
            </div>
            <p className="text-muted small ms-4 ps-2">Select the category that best fits this asset.</p>

            {/* Swiper Slider for Asset Cards */}
            <div className="mt-3">
              <Swiper
                spaceBetween={12}
                slidesPerView="auto"
                modules={[Navigation]}
                className="py-2 px-1"
              >
                {ASSET_TYPES.map((asset) => {
                  const isSelected = selectedAsset === asset.id;
                  return (
                    <SwiperSlide key={asset.id} style={{ width: '130px' }}>
                      <div
                        onClick={() => handleAssetSelect(asset.id)}
                        className={`card h-100 p-3 text-center cursor-pointer transition-all position-relative rounded-3 ${
                          isSelected ? 'border-2 border-success bg-light-subtle shadow-sm' : 'border'
                        }`}
                        style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                        {...register('assetType', { required: true })}
                      >
                        {isSelected && (
                          <i className="bi bi-check-circle-fill text-success position-absolute top-0 end-0 m-2 fs-6"></i>
                        )}
                        <div
                          className="rounded-3 d-flex align-items-center justify-content-center mx-auto mb-2"
                          style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: asset.bgColor,
                            color: asset.color,
                          }}
                        >
                          <i className={`bi ${asset.icon} fs-5`}></i>
                        </div>
                        <span className="fw-semibold small text-dark d-block text-truncate">
                          {asset.label}
                        </span>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>

          <hr className="my-4 text-muted opacity-25" />

          {/* STEP 2: Asset details */}
          <div ref={formRef}  className="mb-4">
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge rounded-circle bg-light text-dark border d-flex align-items-center justify-content-center" style={{ width: 28, height: 28 }}>
                2
              </span>
              <h5 className="mb-0 fw-bold">Asset details</h5>
            </div>
            <p className="text-muted small ms-4 ps-2">Add the latest information for your {activeAssetLabel}.</p>
                {(selectedAsset=='FixedDeposit'||'RecurringDeposit') && bankFields()}
                {selectedAsset=='MUTUAL_FUND' && mutualFundsFields()}
                {selectedAsset=='STOCK' && stocksFields()}
                {selectedAsset=='BOND' && bondsField()}
                {selectedAsset=='COINS' && coinField()}                {selectedAsset=='COINS' && bankFields()}
                {selectedAsset=='CRYPTO' && cryptoFields()}
            <div className="row g-3 mt-1">
              {/* Account Name */}
             <div className="col-6">
   <div className="mb-3 position-relative">
          <label className="form-label">Investment Date</label>
          
          {/* Visible Input Box */}
          <input
            type="text"
            className="form-control"
            readOnly // Prevent typing so they must use the calendar
            value={dates ? format(dates, 'PPP') : ''}
            onClick={() => setShowCalendar(!showCalendar)} // Toggle calendar
            style={{ cursor: 'pointer' }}
          />

          {/* The Calendar Dropdown */}
          {showCalendar && (
            <div 
              className="position-absolute bg-white border rounded shadow-sm p-2 mt-1" 
              style={{ zIndex: 1000 }}
            >
              <DayPicker
                mode="single"
                selected={dates}
                onSelect={(date) => {
                  if (date) {
                    setValue('investmentDate', date); // Update React Hook Form
                    setShowCalendar(false); // Close calendar
                  }
                }}
              />
            </div>
          )}
        </div>
</div>



              {/* Notes */}
              <div className="col-md-6">
                <div className="d-flex justify-content-between align-items-center">
                  <label className="form-label fw-semibold small text-muted">Notes</label>
                  <span className="text-muted small fs-7">{notesLength}/120</span>
                </div>
                <input
                  type="text"
                  maxLength={120}
                  className="form-control rounded-3"
                  placeholder="Add a note for your future self"
                  {...register('notes', {
                    onChange: (e) => setNotesLength(e.target.value.length),
                  })}
                />
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between pt-3 border-top gap-3">
            <div className="d-flex align-items-center gap-2 text-muted small">
              <i className="bi bi-shield-check text-success fs-5"></i>
              <span>Your financial data stays private and secure.</span>
            </div>

            <div className="d-flex align-items-center gap-2 w-100 w-sm-auto justify-content-end">
              <button type="button" className="btn btn-outline-secondary px-4 rounded-3 border-light-subtle fw-semibold">
                Cancel
              </button>
              <button type="submit" className="btn btn-success px-4 rounded-3 fw-semibold d-flex align-items-center gap-2">
                <i className="bi bi-plus-lg"></i>
                Add to portfolio
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}



export default investForm;