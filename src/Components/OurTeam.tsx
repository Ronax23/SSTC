import HeaderReusable from '../assets/Reusable/HeaderReusable'
import CardsSec from '../assets/Reusable/CardsSec'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.css';
// @ts-ignore
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

function OurTeam() {
    const cardDat=
    {
        head:"Our Team Principles",
        cards:[
        {
            icon:"bi bi-people-fill",
            title:"Collaborative Synergy",
            desc:"Unified teams bridging the gap between blueprints and finished components."        },
        {
            icon:"bi bi-mortarboard-fill",
            title:"Technical Mastery",
            desc:"Expert engineers specializing in CNC/VMC operations in the Faridabad hub."        },
        {
            icon:"bi bi-search",
            title:"Precision Mindset",
            desc:"Trained in \"Zero-Defect\" manufacturing for micron-level job work accuracy."        },
        {
            icon:"bi bi-award-fill",
            title:"Certified Expertise",
            desc:"Specialized technicians maintaining our elite ISO and MSME standards."        }
    ]
}
    const team = [
        { name: "Kavita", role: "Owner", photo: '../Team/14.jpg',
          desc: 'I envision this workshop as a hub of mechanical excellence, where resources and people are aligned to deliver quality and innovation. My role is to secure growth while ensuring sustainability'  
         },
        { name: "Bhavya", role: "Manager", photo: '../Team/13.jpg',
            desc: 'I see the workshop as a well-coordinated system. My role is to organize, supervise, and motivate the team so that every process runs smoothly and targets are achieved'
         },
        { name: "Gaurav", role: "Mechnical Engineer",
            desc: 'I envision engineering as the backbone of progress. My role is to design, refine, and innovate processes that enhance precision, efficiency, and safety in the workshop'
        },
        { name: "Ansh", role: "Lathe Operator",
            desc: 'I see my work as supporting mass production. My role is to deliver consistent quality across repeated operations'
        },
        { name: "David", role: "Boring Operator",
            desc: 'I envision precision as the foundation of heavy engineering. My role is to achieve exact tolerances that strengthen the integrity of every component'
        },
        { name: "Sanjeev", role: "VMC Programmer",
            desc: 'I see machining as a craft of accuracy. My role is to operate Vertical Machining Centers with precision, ensuring every component meets the highest standards'
        },
        { name: "Aman", role: "Lathe Operator",
             desc: 'I see the lathe as a tool of craftsmanship. My role is to shape raw materials into precise forms with skill and care'
         },
        { name: "Surya", role: "CNC Operator",
            desc: 'I envision automation as a path to consistency. My role is to run CNC machines with care, optimizing production while minimizing errors and waste'
        },
        { name: "Ojas", role: "M1tr Operator",
            desc: 'I see milling as a versatile art. My role is to shape and cut materials with accuracy, supporting diverse production needs in the workshop'
        }
    ]
    




    return (
        <div>
            <HeaderReusable title="Our Team" image="/Headers/overview.jpg" />
            <CardsSec dynamicdat={cardDat}/>


            <section  id="OurTeam">
              <div className="">
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
                    slidesPerView:2,
                    spaceBetween:40
                }
            }
        }
      >
        {team.map(
            (item,i)=> (
                <SwiperSlide key={i}>
                    <div className="row g-0">
                        <div className="col-lg-6">
                            <img src={item.photo? item.photo:'../Team/11.png'} alt={item.name} className='w-100' />
                        </div>
                        <div className="col-lg-6 p-2 ps-5">
                            <h2 className='mt-5'>{item.name}</h2>
                            <h4 className='mt-3'>{item.role}</h4>
                            <p className='mt-4'>{item.desc}</p>
                        </div>
                    </div>
                </SwiperSlide>
            )
        )}
      </Swiper>
              </div>
            </section>
        </div>
    )
}

export default OurTeam