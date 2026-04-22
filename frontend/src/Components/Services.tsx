import SliderMac from '../assets/Reusable/SliderMac'
import HeaderReusable from '../assets/Reusable/HeaderReusable'
import BrandSection from '../assets/Reusable/BrandSection'
import CardsSec from '../assets/Reusable/CardsSec'

export default function Services() {
const cardDat={
    head:"Our Service Excellence",
    cards:[
        {
            icon:"bi bi-tools",
            title:"Precision Machining",
            desc:"High-accuracy CNC and VMC job work for complex gears, shafts, and custom fasteners"
        },
        {
            icon:"bi bi-stack",
            title:"Heavy Fabrication",
            desc:"End-to-end structural fabrication for machine frames, base plates, and industrial skids"
        },
        {
            icon:"bi bi-vector-pen",
            title:"Custom Tooling",
            desc:"Specialized design and manufacturing of jigs, fixtures, and precision tooling components"
        },
        {
            icon:"bi bi-layers-half",    
            title:"Surface Finishing",
            desc:"Professional finishing including grinding, coating, and anti-rust treatments for durability"
        }
    ]
}
    
  return (
   <>
<HeaderReusable title="Services" image="/Components/16.jpg"/>
<CardsSec dynamicdat={cardDat}/>
<BrandSection/>
<SliderMac />
   
   </>
  )
}
