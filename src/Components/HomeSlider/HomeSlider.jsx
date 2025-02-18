import React from 'react';
import sliderImage1 from '../../assets/imgs/slider-image-1.jpeg';
import sliderImage2 from '../../assets/imgs/slider-image-2.jpeg';
import sliderImage3 from '../../assets/imgs/slider-image-3.jpeg';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function HomeSlider() {
  return (
    <section className="flex flex-col sm:grid grid-cols-12 gap-6 mt-20 mb-8 p-6">
      {/* Main Slider */}
      <div className="col-span-8 rounded-lg overflow-hidden shadow-lg h-[400px]">
        <Swiper
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Autoplay]}
          className="rounded-lg h-full"
        >
          <SwiperSlide>
            <img className="w-full h-full object-cover rounded-lg" src={sliderImage1} alt="Slider Image 1" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="w-full h-full object-cover rounded-lg" src={sliderImage2} alt="Slider Image 2" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="w-full h-full object-cover rounded-lg" src={sliderImage3} alt="Slider Image 3" />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Side Images */}
      <div className="col-span-4 flex flex-col gap-6">
        <img className="w-full h-[195px] rounded-lg shadow-md transition-transform duration-300 hover:scale-105" src={sliderImage1} alt="Featured Image 1" />
        <img className="w-full h-[195px] rounded-lg shadow-md transition-transform duration-300 hover:scale-105" src={sliderImage2} alt="Featured Image 2" />
      </div>
    </section>
  );
}
