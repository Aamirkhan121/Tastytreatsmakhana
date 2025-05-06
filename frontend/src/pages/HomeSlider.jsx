// src/components/HomeSlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const HomeSlider = () => {
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

  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[400px] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={slide.image}
                alt={slide.alt}
                className="absolute inset-0 w-full h-full object-cover opacity-90"
              />
              <div className="relative z-10 text-center px-4">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
                  {slide.heading}
                </h2>
                <p className="text-sm sm:text-lg md:text-xl text-white mt-2 drop-shadow-md">
                  {slide.subheading}
                </p>
              </div>
              <div className="absolute inset-0 bg-black opacity-30"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeSlider;
