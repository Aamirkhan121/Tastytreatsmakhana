import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
  {
    id: 1,
    image: '/creame-onion.png',
    alt: 'Creamy Onion Banner',
    heading: 'Creamy Onion Makhana',
    subheading: 'Crunchy & Flavorful Snack',
  },
  {
    id: 2,
    image: '/creamy-cheese.png',
    alt: 'Creamy Cheese Banner',
    heading: 'Creamy Cheese Makhana',
    subheading: 'Irresistibly Cheesy Delight',
  },
  {
    id: 3,
    image: '/himalayan-salted.png',
    alt: 'Himalayan Salted Banner',
    heading: 'Himalayan Salted Makhana',
    subheading: 'Simple. Pure. Healthy.',
  },
  {
    id: 4,
    image: '/peri-peri.png',
    alt: 'Peri Peri Banner',
    heading: 'Peri Peri Makhana',
    subheading: 'Spice It Up!',
  },
  {
    id: 5,
    image: '/blackpepper.png',
    alt: 'Black Pepper Banner',
    heading: 'Black Pepper Makhana',
    subheading: 'Bold and Tasty',
  },
];

const HomeSlider = () => {
  return (
    <div className="w-full">
      {/* 🔁 Scrolling Banner Reel */}
      <div className="bg-orange-500 text-white py-2 overflow-hidden relative z-20">
        <div className="whitespace-nowrap animate-marquee font-semibold text-lg flex gap-8">
          <span>🎉 Free Delivery on Orders Above ₹500! 🚚</span>
          <span>🎉 Free Delivery on Orders Above ₹500! 🚚</span>
          <span>🎉 Free Delivery on Orders Above ₹500! 🚚</span>
          <span>🎉 Free Delivery on Orders Above ₹500! 🚚</span>
          <span>🎉 Free Delivery on Orders Above ₹500! 🚚</span>
          <span>🎉 Free Delivery on Orders Above ₹500! 🚚</span>
          <span>🎉 Free Delivery on Orders Above ₹500! 🚚</span>
          <span>🎉 Free Delivery on Orders Above ₹500! 🚚</span>
          <span>🎉 Free Delivery on Orders Above ₹500! 🚚</span>
          <span>🎉 Free Delivery on Orders Above ₹500! 🚚</span>
        </div>
      </div>

      {/* 🖼️ Slider */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-[320px] sm:h-[420px] md:h-[520px] lg:h-[450px] overflow-hidden">
              {/* Background Image */}
              <img
                src={slide.image}
                alt={slide.alt}
                className="absolute inset-0 w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-[3000ms] ease-in-out"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent opacity-60 z-10"></div>

              {/* Text Content */}
              <div className="relative z-20 h-full flex flex-col justify-center items-start px-6 sm:px-12 md:px-20">
                <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-md mb-2">
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


