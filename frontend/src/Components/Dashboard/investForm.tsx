import { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import gsap from 'gsap';

// Import Swiper styles
import 'swiper/css';
//@ignore
import 'swiper/css/navigation';
import { p } from 'framer-motion/client';

interface AssetType {
  id: string;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
}

const ASSET_TYPES: AssetType[] = [
  { id: 'savings', label: 'Savings', icon: 'bi-wallet2', color: '#0d6efd', bgColor: '#e7f1ff' },
  { id: 'fixed_deposit', label: 'Fixed deposit', icon: 'bi-lock', color: '#fd7e14', bgColor: '#fff4e6' },
  { id: 'mutual_funds', label: 'Mutual funds', icon: 'bi-pie-chart', color: '#6f42c1', bgColor: '#f3ebf7' },
  { id: 'stocks', label: 'Stocks', icon: 'bi-graph-up-arrow', color: '#198754', bgColor: '#e8f5e9' },
  { id: 'usd', label: 'USD', icon: 'bi-currency-dollar', color: '#0d6efd', bgColor: '#e7f1ff' },
  { id: 'gold_silver', label: 'Gold / Silver', icon: 'bi-gem', color: '#fd7e14', bgColor: '#fff4e6' },
  { id: 'crypto', label: 'Crypto', icon: 'bi-currency-bitcoin', color: '#d63384', bgColor: '#fce4ec' },
];

interface FormValues {
  assetType: string;
  accountName: string;
  bankName: string;
  currentValue: string;
  investedAmount: string;
  startDate: string;
  notes: string;
}

function investForm() {
  const formRef = useRef<HTMLDivElement>(null);
  const [notesLength, setNotesLength] = useState<number>(0);

  const {
    register,handleSubmit,setValue,control,formState: { errors },watch,unregister } = useForm<FormValues>({});
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


const   bankFields=()=>{
<div className="row">
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
</div>
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
                {selectedAsset=='fixed_deposit' && bankFields()}
            <div className="row g-3 mt-1">
              {/* Account Name */}
              <div className="col-md-6">
                <label className="form-label fw-semibold small">
                  Account name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control rounded-3 ${errors.accountName ? 'is-invalid' : ''}`}
                  placeholder="e.g. Emergency fund"
                  {...register('accountName', { required: 'Account name is required' })}
                />
                {errors.accountName && <div className="invalid-feedback">{errors.accountName.message}</div>}
              </div>

              {/* Bank or institution */}
              <div className="col-md-6">
                <label className="form-label fw-semibold small text-muted">Bank or institution</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  placeholder="e.g. HDFC Bank"
                  {...register('bankName')}
                />
              </div>

              {/* Current Value */}
              <div className="col-md-6">
                <div className="d-flex justify-content-between align-items-center">
                  <label className="form-label fw-semibold small">
                    Current value <span className="text-danger">*</span>
                  </label>
                  <span className="text-muted small fs-7">Use today's approximate value</span>
                </div>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 rounded-start-3">₹</span>
                  <input
                    type="number"
                    className={`form-control border-start-0 rounded-end-3 ${errors.currentValue ? 'is-invalid' : ''}`}
                    placeholder="0"
                    {...register('currentValue', { required: 'Current value is required' })}
                  />
                </div>
                {errors.currentValue && <div className="text-danger small mt-1">{errors.currentValue.message}</div>}
              </div>

              {/* Amount Invested */}
              <div className="col-md-6">
                <div className="d-flex justify-content-between align-items-center">
                  <label className="form-label fw-semibold small text-muted">Amount invested</label>
                  <span className="text-muted small fs-7">Optional</span>
                </div>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 rounded-start-3">₹</span>
                  <input
                    type="number"
                    className="form-control border-start-0 rounded-end-3"
                    placeholder="0"
                    {...register('amountInvested')}
                  />
                </div>
              </div>

              {/* Purchase / Start Date */}
              <div className="col-md-6">
                <div className="d-flex justify-content-between align-items-center">
                  <label className="form-label fw-semibold small text-muted">Purchase / start date</label>
                  <span className="text-muted small fs-7">Optional</span>
                </div>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 rounded-start-3">
                    <i className="bi bi-calendar3 text-muted"></i>
                  </span>
                  <input
                    type="date"
                    className="form-control border-start-0 rounded-end-3 text-muted"
                    {...register('startDate')}
                  />
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