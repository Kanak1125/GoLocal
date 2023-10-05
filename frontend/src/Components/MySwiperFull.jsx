import { Navigation, Pagination, Autoplay} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const imgArr = [
    "https://images.unsplash.com/photo-1557659685-c32f6f233dda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80",
    "https://images.unsplash.com/photo-1611516491426-03025e6043c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1033&q=80",
    "https://images.unsplash.com/photo-1623148016239-3191aeca3bbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    "https://images.unsplash.com/photo-1623268964699-e89af976bc17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  ]

const swiperSlides = imgArr.map((img, index) => {
    return (
      <SwiperSlide key={index} className='h-full'>
        <img src={img} alt="" className={`h-full w-full object-contain object-bottom bg-black`}/>
        <div className='w-full h-full '></div>
      </SwiperSlide>
    )
  })

const MySwiperFull = () => {
  return (
    <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        loop={true}
        autoplay={{
          delay: 10000, 
          disableOnInteraction: false
        }}
        pagination={{ clickable: true }}
      >
        {swiperSlides}
      </Swiper>
  )
}

export default MySwiperFull