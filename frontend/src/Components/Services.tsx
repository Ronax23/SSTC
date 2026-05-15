import SliderMac from '../assets/Reusable/SliderMac'
import HeaderReusable from '../assets/Reusable/HeaderReusable'
import BrandSection from '../assets/Reusable/BrandSection'
import CardsSec from '../assets/Reusable/CardsSec'
import {serviceCard} from"../../public/data.json"
export default function Services() {
return (
   <>
<HeaderReusable title="Services" image="/Components/16.jpg"/>
<CardsSec dynamicdat={serviceCard}/>
<BrandSection/>
<SliderMac />
   </>
  )
}
