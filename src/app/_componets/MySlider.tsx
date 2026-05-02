"use client"

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface TypeofSlider {
    listOfImages : string[] ,
    spaceBetween? : number,
    slidesPerView? : number
}


export default function MySlider (  {listOfImages ,spaceBetween = 100, slidesPerView = 3} : TypeofSlider) {
    return (
        <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
        loop
        navigation
        pagination={{ clickable: true,  bulletActiveClass :"bg-white! opacity-75! w-5! rounded-2xl!" , renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
    }}}
        >
        {listOfImages.map(image => <SwiperSlide> <img className='w-full  h-120 object-cover' src={image} alt="" /> </SwiperSlide>)}
        </Swiper>
    );
};