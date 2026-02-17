import { useState,useEffect,useRef } from 'react'
import BrandSection from '../assets/Reusable/BrandSection.tsx'
import ServiceTabs from '../assets/Reusable/ServiceTabs.tsx'
import { Link } from 'react-router-dom'
import CardsSec from '../assets/Reusable/CardsSec.js'
import { useData } from '../context/Context.tsx'
import LoaderError from '../assets/Reusable/LoaderError.js'
import type { counterMap, dynamics } from '../assets/Loading/Types.ts'

export default function LandingPage() {
    // const counterMap=data.counterMap;
    // const CardsMap=data.CardsMap;
    // const dynamics=data.dynamics;
    const { data, loading } = useData() as { data: any; loading: boolean };
    // console.log(data);
    const { counterMap, CardsMap, dynamics } = data||{};
//     const dynamics=[
//     {
//         content:"Expert Precision in Every Component",
//         p:"Specialized job-work for high-quality moulds, dies, and custom industrial parts tailored to your specifications",
//         imgsrc:"/Headers/Carousel1.jpg"     
//     },
//     {
//         content:"Hydro-Turbine Part Specialists",
//         p:"Delivering durable, high-performance components engineered to withstand the rigors of the power generation industry",
//         imgsrc:"/Headers/Carousel2.jpg"     
//     },
//     {
//         content:"Advanced Tooling, Proven Reliability",
//         p:"Combining years of workshop expertise with modern machining to ensure your projects are delivered on time and on spec",
//         imgsrc:"/Headers/Carousel3.jpg"     
//     }
// ]
//     const counterMap=[
//         {
//             count:15,
//             title:"Years of Excellence"
//         },
//         {
//             count:500,
//             title:"Projects Delivered"
//         },
//         {
//             count:200,
//             title:"Precision Moulds"
//         },
//         {
//             count:120,
//             title:"Satisfied Clients"
//         }
//     ]
//     const CardsMap=[
//         {
//             icon:"bi bi-bullseye",
//             title:"Precision-First Approach",
//             desc:"Ensuring exact tolerances in every mould and die we craft"
//         },
//         {
//             icon:"bi-gear-wide-connected",
//             title:"Technical Mastery",
//             desc:"Deep expertise in the specialized manufacturing of hydro-turbine components"
//         },
//         {
//             icon:"bi-patch-check",
//             title:"Uncompromising Quality",
//             desc:"Rigorous testing protocols to guarantee durability in high-stress environments"
//         },
//         {
//             icon:"bi-clock-history",
//             title:"On-Time Execution",
//             desc:"Streamlined workshop management to meet your critical project deadlines"
//         }
//     ];
  


    const ref = useRef<HTMLDivElement | null>(null);
    const [adder, setAdder] = useState(0);
const maxCount = Math.max(...counterMap?.map((item:{count:number}) => item.count) || []);
useEffect(() => {
    let interval:number|null = null;
    
    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            interval = setInterval(() => {
                setAdder(prev => prev < maxCount ? prev + 1 : prev);
            }, 2); // Speed of the count
        } else {
            if (interval) {
                clearInterval(interval);
                interval = null;
            }
        }
    }, { threshold: 1 });
    
    if (ref.current) observer.observe(ref.current);
    
    return () => {
        if (interval) clearInterval(interval);
        observer.disconnect();
    };
}, [data]); // Runs once when page opens

if (loading || !data) {
    return <LoaderError/>
  }
  return (
    <>
    <header id='main'>
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    {dynamics.map((item:dynamics, index:number)=>(
        <div className={`carousel-item${index===0 ? " active":""}`} key={index}>
        <div className='dynamicCaroe d-block' 
    style={{ '--image-url': `url(${item.imgsrc})` }as React.CSSProperties}>
            <div className='container'>
                <div className='row mb-5'>
                    <div className='col-lg-6 my-5 carousel-mover'>
                        <h1 className='text-white'>{item.content}</h1>
                        <p className='text-white mt-4'>{item.p}</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    ))}
  </div>
    </div>
    </header>
   <BrandSection/>
    
    <section id="sec3" className='my-5'>
    <div className="container">
        <div className="row">
            <h1 className='text-center my-4'>Our Vision</h1>
            <div className="col-lg-6  my-2">
                <div className="img1 overflow-hidden position-relative">
                <img  src="/Components/mould.jpg" alt="Our Vision" className="img-fluid" />
                <div className="hover-img position-absolute">
                    <img src="/Headers/Carousel2.jpg" alt="" />
                </div>
                </div>
                

            </div>
            <div className="col-lg-6 mt-5">
                <h2>Precision. Progress. Partnership. Sub-heading</h2>
                <p>To lead the next industrial revolution by integrating advanced CNC technology with master craftsmanship, ensuring that every component we deliver is a testament to Indian engineering excellence on the global stage</p>
                 <Link to="/workshop" className='btn btn-success'>Learn More</Link>
            </div>
        </div>
    </div>

    </section>

   <CardsSec dynamicdat={CardsMap}/>


    <section id="counterSection"  ref={ref}>
        <div className="container">
            <div className="row text-center">
                {counterMap.map((item:counterMap, index:number)=>(
                    <div className="col-lg-3 col-6" key={index}>
                       <div className="cards">
                         <h2>{Math.min(adder, item.count)}+</h2>
                        <p>{item.title}</p>
                       </div>
                    </div>
                ))}
            </div>
        </div>
    </section>

    <ServiceTabs/>

    <div className="contactBanner">
       <div className="container">
         <div className="row">
            <div className="col-lg-6 col-md-8 col-12">
                <h1 className='my-5'>{`Leveraging Over ${new Date().getFullYear() - 2011} Years of Expertise in Precision Manufacturing`}</h1>
            </div>
            <div className="col-lg-6 col-md-4 col-12 align-content-center text-lg-center"><Link to="/contact" className='custom-btn'>
            <i className="bi bi-arrow-right"><span>Contact us</span></i>
            </Link></div>
        </div>  
       </div>
    </div>

    </>
  )
}
