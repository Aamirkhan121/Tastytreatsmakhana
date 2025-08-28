import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const HomeSlider = () => {
  return (
    <div className="w-full">
      {/* 🔁 Seamless Marquee */}
      <div className="overflow-hidden bg-orange-500 text-white py-2 relative z-20">
        <div className="flex w-max animate-marquee gap-16">
          {Array(2).fill(
            <span className="whitespace-nowrap text-lg font-semibold">
              🎉 Cash on delivery For Orders Above ₹500! 🚚 &nbsp;
              🎉 Cash on delivery For Orders Above ₹500 ! 🚚 &nbsp;
              🎉 Cash on delivery For Orders Above ₹500   ! 🚚 &nbsp;
              🎉 Cash on delivery For Orders Above ₹500  ! 🚚 &nbsp;
              🎉 Cash on delivery For Orders Above ₹500 ! 🚚   
            </span>
          )}
        </div>
      </div>

      {/* 🖼️ Swiper with Responsive Banners */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="w-full">
            {/* Desktop Banner */}
            <img
              src="/WEB BANNER.jpg"
              alt="Web Banner"
              className="hidden md:block w-full"
            />
            {/* Mobile Banner */}
            <img
              src="/Mobile Banner.jpg"
              alt="Mobile Banner"
              className="block md:hidden w-full"
            />
          </div>
        </SwiperSlide>

        {/* Slide 2 - duplicate for looping */}
        <SwiperSlide>
          <div className="w-full">
            <img
              src="/WEB BANNER (2).jpg"
              alt="Web Banner"
              className="hidden md:block w-full"
            />
            <img
              src="/Mobile Bnner (2).jpg"
              alt="Mobile Banner"
              className="block md:hidden w-full"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomeSlider;




