import HeaderReusable from '../assets/Reusable/HeaderReusable'
import CardsSec from '../assets/Reusable/CardsSec'
import {teamCard,team} from '../../public/data.json' with { type: 'json' };
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.css';
// @ts-ignore
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

function OurTeam() {
    return (
        <section>
            <HeaderReusable title="Our Team" image="/Headers/overview.jpg" />
            <CardsSec dynamicdat={teamCard}/>


            <section  id="OurTeam">
              <section className="">
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
                    <section className="row g-0">
                        <section className="col-lg-6">
                            <img src={item.photo? item.photo:'../Team/11.png'} alt={item.name} className='w-100' />
                        </section>
                        <section className="col-lg-6 p-2 ps-5">
                            <h2 className='mt-5'>{item.name}</h2>
                            <h4 className='mt-3'>{item.role}</h4>
                            <p className='mt-4'>{item.desc}</p>
                        </section>
                    </section>
                </SwiperSlide>
            )
        )}
      </Swiper>
              </section>
            </section>
        </section>
    )
}

export default OurTeam