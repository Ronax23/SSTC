import {useState} from 'react'
import type{ServiceType,
    ServiceDetail} from '../Loading/Types';
const dynamicSelector:Record<ServiceType,ServiceDetail>={
  Hydro_Engineering:{
    img:"/Headers/Carousel2.jpg",
    p:"We manufacture high-durability fluid components including turbine runners and pressure valves. Our engineering focuses on extreme corrosion resistance and zero-leakage performance for sustainable water power and management infrastructures."
    },
  Component_Jobwork:{
    img:"/Components/cast2.jpg",
    p:"We provide high-tolerance jobwork utilizing advanced CNC, VMC, and Lathe technologies. This division specializes in subtractive manufacturing and multi-axis milling to deliver custom-engineered components with superior surface finishes. Our processes ensure exact dimensional accuracy for both rapid prototyping and high-volume industrial production."
  },
  Precision_Die_Moulding:{
    img:"/Components/diecast.jpg",
    p:"We design and fabricate high-complexity moulds with micron-level tolerances for mass production. Our CNC-machined tooling ensures perfect repeatability and structural integrity for millions of identical plastic and metal components."
  },
  Industrial_Press_Components:{
    img:"/Components/press.jpg",
    p:"Focused on heavy-duty force, we engineer robust frames and hydraulic cylinders for industrial press machinery. Our components are built to withstand high-tonnage impacts while maintaining surgical precision in shearing and forming operations"
  }
}


function ServiceTabs() {
    const [selected,setSelected] =useState<ServiceType>(Object.keys(dynamicSelector)[0] as ServiceType);

    
  return (
    <section id="sec4">
        <div className='container my-5'>
            <div className='row'>
                    <h1 className='text-center my-3'>Our Core Expertise</h1>
                    <p>We specialize in transforming complex engineering challenges into high-performance components. Explore our core operational verticals, where advanced technology meets specialized craftsmanship to serve the unique demands of global industries</p>
                </div>
                 <div className='row my-3'>

              <div className="col-lg-3 col-md-4 my-4">
                <div className="list-group" id="list-tab" role="tablist">
                 {Object.entries(dynamicSelector).map(([key, _item]) => (
          <button 
            onClick={() => setSelected(key as ServiceType)} 
            className={`list-group-item ${selected === key ? 'SelectionActive animate-content' : ''}`}
          >
            {key.replace(/_/g, ' ')}
          </button>
        ))}
                </div>
              </div>
            
              <div className="col-lg-8 col-md-7 overflow-hidden">
                <div className="tab-content">
                  <div className="tab-pane fade show active">
                   <div className="row">
                     <div 
          className="col-lg-6 text-animate" 
          key={`text-${selected}`} 
        >
          <h1 className="fw-bold text-primary">
            {selected.replace(/_/g, ' ')}
          </h1>
          <p className="lead">{dynamicSelector[selected].p}</p>
        </div>
        
        
        <div 
          className="col-lg-6 img-animate" 
          key={`img-${selected}`} 
        > 
          <img 
            src={dynamicSelector[selected].img} 
            alt="Course" 
            className="img-fluid rounded shadow-lg border" 
          />
        </div>
                   </div>
                    
                  </div>
                </div>
              </div>
            </div>
            </div>
           
       
    </section>
  )
}

export default ServiceTabs