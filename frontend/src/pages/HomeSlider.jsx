import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
  {
    id: 1,
    heading: 'New Flavors Coming Soon!',
    subheading: 'Stay tuned for our next big crunch',
    gradient: 'from-orange-500 via-red-400 to-pink-400',
  },
  {
    id: 2,
    heading: 'Exciting Launch Ahead!',
    subheading: 'We’re cooking up something special just for you',
    gradient: 'from-purple-500 via-indigo-500 to-blue-400',
  },
  {
    id: 3,
    heading: 'Healthy Just Got Tastier',
    subheading: 'New roasted makhana flavors are on their way!',
    gradient: 'from-green-400 via-lime-400 to-yellow-300',
  },
];

const HomeSlider = () => {
  return (
    <div className="w-full">
      {/* 🔁 Seamless Marquee */}
      <div className="overflow-hidden bg-orange-500 text-white py-2 relative z-20">
        <div className="flex w-max animate-marquee gap-16">
          {Array(2).fill( 
            <span className="whitespace-nowrap text-lg font-semibold">
              🎉 Free Delivery on Orders Above ₹500! 🚚 &nbsp;
              🎉 Free Delivery on Orders Above ₹500! 🚚 &nbsp;
              🎉 Free Delivery on Orders Above ₹500! 🚚 &nbsp;
              🎉 Free Delivery on Orders Above ₹500! 🚚 &nbsp;
              🎉 Free Delivery on Orders Above ₹500! 🚚 &nbsp;
              🎉 Free Delivery on Orders Above ₹500! 🚚 &nbsp;
              🎉 Free Delivery on Orders Above ₹500! 🚚 &nbsp;
              🎉 Free Delivery on Orders Above ₹500! 🚚 &nbsp;
              🎉 Free Delivery on Orders Above ₹500! 🚚 &nbsp;
              🎉 Free Delivery on Orders Above ₹500! 🚚 &nbsp;
              🎉 Free Delivery on Orders Above ₹500! 🚚   
            </span>
          )}
        </div>
      </div>

      {/* 🖼️ Gradient Swiper Slider */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className={`relative w-full h-[320px] sm:h-[420px] md:h-[500px] lg:h-[450px] flex items-center justify-center bg-gradient-to-r ${slide.gradient}`}
            >
              <div className="text-center px-4 sm:px-10">
                <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-md mb-2 animate-pulse">
                  {slide.heading}
                </h2>
                <p className="text-white text-lg sm:text-xl md:text-2xl font-medium drop-shadow-lg">
                  {slide.subheading}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeSlider;




