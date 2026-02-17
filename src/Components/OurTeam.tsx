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
        { name: "John Doe", role: "Project Manager", photo: "https://randomuser.me/api/portraits/men/1.jpg" },
        { name: "Jane Smith", role: "Lead Developer", photo: "https://randomuser.me/api/portraits/women/2.jpg" },
        { name: "Mike Johnson", role: "UI/UX Designer", photo: "https://randomuser.me/api/portraits/men/3.jpg" },
        { name: "Emily Davis", role: "QA Engineer", photo: "https://randomuser.me/api/portraits/women/4.jpg" },
        { name: "David Wilson", role: "DevOps Engineer", photo: "https://randomuser.me/api/portraits/men/5.jpg" },
        { name: "Sarah Brown", role: "Marketing Specialist", photo: "https://randomuser.me/api/portraits/women/6.jpg" },
        { name: "Chris Lee", role: "Backend Developer", photo: "https://randomuser.me/api/portraits/men/7.jpg" },
        { name: "Anna Garcia", role: "Frontend Developer", photo: "https://randomuser.me/api/portraits/women/8.jpg" },
        { name: "James Martinez", role: "Data Scientist", photo: "https://randomuser.me/api/portraits/men/9.jpg" }
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
                            <img src={item.photo} alt={item.name} className='w-100' />
                        </div>
                        <div className="col-lg-6 p-2 ps-5">
                            <h2 className='mt-5'>{item.name}</h2>
                            <h4>{item.role}</h4>
                            <p>{item.name}</p>
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