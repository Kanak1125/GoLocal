import { Navigation, Pagination, Autoplay} from 'swiper/modules';
import { Swiper } from 'swiper/react';
// import { EffectCube } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
// import 'swiper/css/effect-cube';

const MySwiper = ({ children }) => {
  return (
    <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        loop={true}
        // autoplay={{
        //   delay: 10000, 
        //   disableOnInteraction: false
        // }}
        pagination={{ clickable: true }}
        // effect="cube"
      >
        {children}
      </Swiper>
  )
}

export default MySwiper