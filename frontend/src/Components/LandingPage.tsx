import { useState,useEffect,useRef } from 'react'
import BrandSection from '../assets/Reusable/BrandSection.tsx'
import ServiceTabs from '../assets/Reusable/ServiceTabs.tsx'
import { Link } from 'react-router-dom'
import CardsSec from '../assets/Reusable/CardsSec.js'
import type { counterMap, dynamics } from '../assets/Loading/Types.ts'
import data from "../../public/data.json"
export default function LandingPage() {
    const [location, setLocation] = useState<{latitude: number; longitude: number}>({
    latitude: -23.1857,longitude: -45.8892});   
    const { counterMap, CardsMap, dynamics } = data;

useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
        setLocation({latitude: position.coords.latitude, longitude: position.coords.longitude});
        console.log(location.latitude, location.longitude);
    }, (error) => {
        console.error("Error getting geolocation:", error);
    });
}, []);

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
