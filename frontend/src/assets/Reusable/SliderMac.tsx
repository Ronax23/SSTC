import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.css';
// @ts-ignore
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import {slides} from  "../../../public/data.json"
function SliderMac() {

 
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