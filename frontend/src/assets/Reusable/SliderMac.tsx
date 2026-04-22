import type{slides} from '../Loading/Types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.css';
// @ts-ignore
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
function SliderMac() {

    const slides:slides[] = [
        {
            imgsrc: "/Service/1.jpg",
            title: "Flywheel Of Press Machine",
            caption:"Flywheels smooth out power delivery in mechanical presses by maintaining consistent rotational speed. They supply peak energy bursts to the crankshaft and ram, compensating for momentary load spikes that would otherwise slow the motor."
        },
        {
            imgsrc: "/Service/2.jpg",
            title: "SAMCO Machine Base Plate",
            caption:"We provide high-precision jobwork for internal machine components, including gears, shafts, and specialized fasteners. Using client-provided blueprints, we utilize CNC and VMC machining to achieve microscopic tolerances and superior surface finishes, ensuring every custom-made part integrates perfectly into your specific machinery"
        },
        {
            imgsrc: "/Service/3.jpg",
            title: "AVL Frame Fabrication & Finishing",
            caption:"We provide end-to-end manufacturing for frames, managing the entire process from heavy-duty structural fabrication to final surface treatment. This comprehensive jobwork ensures a durable, shop-ready frame that meets strict structural and aesthetic standards."
        },
        {
            imgsrc: "/Service/4.jpg",
            title: "ISGEC Bolster & Adapter Machining",
            caption:"We deliver high-precision jobwork for ISGEC press machine bolsters and adapters using our heavy-duty KAFO 3-axis VMC. Our process ensures perfect flatness, precise T-slot milling, and exact bore alignment, guaranteeing stable die-clamping and seamless integration for heavy-tonnage press systems."
             },
        {
            imgsrc: "/Service/5.jpg",
            title: "SAMCO Robust Machine Housing",
            caption:"We execute precision cutting, bending, and welding of sheet metal to create vibration-resistant, anti-corrosive frames. We specialize in manufacturing these protective shells according to exact structural specifications for industrial equipment."
        },
        {
            imgsrc: "/Service/6.jpg",
            title: "SAMCO Industrial Machine Frames",
            caption:"Heavy-Duty Structural Fabrication We specialize in the contract manufacturing of robust machine frames for SAMCO, engineered to support heavy industrial loads. Utilizing high-grade steel and precision welding techniques, we fabricate these skeletons to ensure perfect alignment and zero-deflection under operational stress."
        },
        {
            imgsrc: "/Service/7.jpg",
            title: "Voith Press Machine Components",
            caption:"We specialize in the high-precision machining of critical components for press machines. Utilizing our advanced VMC and lathe capabilities, we ensure every part meets the stringent dimensional tolerances and surface integrity required for high-speed paper and industrial press applications."
        },
        {
            imgsrc: "/Service/8.jpg",
            title: "Grandprix Housing Holder Machining",
            caption:"Precision VMC Jobwork We specialize in the precision machining of Grandprix housing holders using advanced VMC technology. Our process ensures tight positional tolerances and high-quality surface finishes required for secure component seating."
             },
             {
            imgsrc: "/Service/9.jpg",
            title: "JBM Die Mould Base Machining",
            caption:"We provide high-precision jobwork for die mould bases, utilizing our 3-axis VMC to achieve perfect surface flatness and exact pocket dimensions. Our machining process ensures high-tolerance alignment and a superior finish, meeting the rigorous standards required for heavy-duty automotive tooling and high-volume production"
             },
             {
            imgsrc: "/Service/12.jpg",
            title: "Voith Press Machine Rotor Shaft",
            caption:"We provide specialized machining for Voith press machine rotor shafts, focusing on high-load durability and precision alignment. Utilizing heavy-duty lathes and grinding equipment, we achieve the exact stepped diameters and micron-level surface finishes required for high-speed industrial rotation. Our jobwork ensures perfect concentricity and dynamic balance, critical for preventing vibration and extending the bearing life of Voith's high-performance machinery"
             },
             {
            imgsrc: "/Service/17.jpg",
            title: "Fabricated Stuffing Box",
            caption:"We provide end-to-end jobwork for stuffing box components, from structural fabrication to final precision machining. Using 3-axis VMC and lathe work, we ensure exact bore tolerances and seating flatness, guaranteeing leak-proof seals and perfect alignment for high-pressure industrial applications."
             },
             {
            imgsrc: "/Service/18.jpg",
            title: "Motor Mounting Bracket Machining",
            caption:"We provide precision jobwork for heavy-duty motor mounting brackets, specializing in high-strength fabrication and 3-axis VMC machining. Our process ensures perfect mounting hole alignment and flat seating surfaces to eliminate motor vibration and structural stress. Finished with industrial-grade sandblasting and painting, these brackets offer maximum durability and exact fitment for industrial drive systems."
        },
        {
            imgsrc: "/Service/19.jpg",
            title: "Drilling Jig for Bearing House",
            caption:"We specialize in the precision manufacturing of drilling jigs for bearing housings using 3-axis VMC machining. Our jobwork ensures exact hole coordinates and bushing alignment, critical for maintaining the concentricity of the bearing bore. Designed for durability and repeat accuracy, these jigs facilitate error-free production and perfect interchangeability of bearing components."
        },
        {
            imgsrc: "/Service/20.jpg",
            title: "Francis Runner",
            caption:"We provide precision jobwork for Uflex top plates, utilizing our 3-axis VMC to achieve high-accuracy surface facing and mounting hole patterns. Our machining ensures perfect parallelism and flatness, which are critical for the stable mounting of industrial equipment and vibration-free operation in Uflex machinery systems."
             },
             {
            imgsrc: "/Service/23.jpg",
            title: "Top Plate for Uflex",
            caption:"We specialize in high-precision jobwork for Kaplan Runners, using advanced lathe turning for hub concentricity and 3-axis VMC machining for complex blade geometries. Our process ensures exact pitch and twist profiles, delivering maximum hydraulic efficiency and balanced rotation for low-head hydro turbines."
             },
             {
            imgsrc: "/Service/25.jpg",  
            title: "Turbine Shaft Machining",
            caption:"We provide specialized lathe jobwork for heavy-duty turbine shafts, ensuring perfect concentricity and dimensional accuracy. Our process focuses on achieving micron-level tolerances on stepped diameters and bearing seats to eliminate run-out. By utilizing heavy-duty turning and precision finishing, we deliver shafts that guarantee dynamic balance and vibration-free performance in high-speed turbine environments."
             },
             
             {
            imgsrc: "/Headers/Carousel2.jpg",
            title: "Pelton Runner Machining",
            caption:"We provide precision jobwork for Pelton Runners using heavy-duty lathe turning for disc concentricity and 3-axis VMC machining for intricate bucket profiling. Our process ensures exact splitter geometry and balanced bucket alignment, delivering maximum kinetic energy transfer and vibration-free performance for high-head hydro turbines."
             },
             {
            imgsrc: "/Headers/Carousel1.jpg",
            title: "Suzuki Mould Machining",
            caption:"We specialize in high-precision Maruti mould facing utilizing our advanced 3-axis VMC technology. This process ensures exceptional surface flatness and dimensional accuracy required for automotive grade injection and casting moulds. By leveraging high-speed vertical milling, we achieve a superior finish that reduces the need for secondary polishing"
           }
    ];
  return (
    <div className='p-3'>
     <h1 className='text-center my-5'>Featured Work & Components</h1>
    <Swiper

        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        breakpoints={
            {
                  100:
                {
                    slidesPerView:1,
                    spaceBetween:20
                },
                450:
                {
                    slidesPerView:2,
                    spaceBetween:30
                },
               769:
                {
                    slidesPerView:3,
                    spaceBetween:40
                }
            }
        }
      >
       
        {slides.map((slide, index) => (
        <SwiperSlide key={index}>
            <div className="card">
                <div className="card-img-top w-100">
                <img src={slide.imgsrc}  alt={slide.title} />
                </div>
                
                <div className="card-body">
                    <h2>
                    {slide.title}
                    </h2>
                    <h5 className="card-title">{slide.caption}</h5>
                </div>
            </div>
        </SwiperSlide>
      ))}
      </Swiper>
        
    </div>
  )
}

export default SliderMac