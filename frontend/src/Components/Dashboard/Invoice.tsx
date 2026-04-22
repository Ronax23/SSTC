import React from 'react'

function Invoice() {
  return (
    <>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <form action="">
                        <div className="col-12">
                            <label htmlFor="">Invoice Type</label>
                            <input type="radio" /> <label htmlFor="">Invoice Inventory Sales</label>
                            <input type="radio" /> <label htmlFor="">Invoice Custom Sales</label>
                            <input type="text" placeholder='Invoice Number' />
                            <input type="date" placeholder='Invoice Date' />

                        </div>
                        <div className="col-lg-5 col-md-5">
                            <input type="text" placeholder='Product Name' />
                        </div>
                        <div className="col-1">
                            <input type="text" placeholder='HSN Code' />
                        </div>
                        
                        <div className="col-1">
                            <input type="text" placeholder='qty' />
                        </div>
                        <div className="col-1">
                            <input type="text" placeholder='Price' />
                        </div>
                        <div className="col-4">
                            <input type="text" placeholder='Total' />
                        </div>
                        </form>
                </div>
            </div>
        </div>
    
    </>
  )
}

export default Invoice