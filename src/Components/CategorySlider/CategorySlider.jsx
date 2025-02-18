import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function CategorySlider() {
  const [categories, setCategories] = useState(null);

  async function getCategories() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategories(data?.data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <section className="my-12 p-6">
      <h2 className="mb-8 text-3xl text-gray-900 font-bold text-center uppercase tracking-wide">
        Explore Our Categories
      </h2>
      {!categories ? (
        <Loading />
      ) : (
        <Swiper
          slidesPerView={5} // Default for large screens
          loop={true}
          autoplay={{ delay: 2200, disableOnInteraction: false }}
          spaceBetween={20} // Add spacing between slides
          modules={[Autoplay]}
          breakpoints={{
            320: { slidesPerView: 1 }, // Mobile
            480: { slidesPerView: 2 }, // Small screens
            768: { slidesPerView: 3 }, // Tablets
            1024: { slidesPerView: 4 }, // Small desktops
            1440: { slidesPerView: 5 }, // Large desktops
          }}
          className="pb-8"
        >
          {categories?.map((category) => (
            <SwiperSlide key={category._id} className="group">
              <div className="h-80 rounded-lg overflow-hidden shadow-md border border-gray-300 relative cursor-pointer transition-transform duration-300 group-hover:scale-105 hover:shadow-lg">
                <img
                  className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-85"
                  src={category.image}
                  alt={category.name}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white text-lg font-semibold tracking-wide uppercase">
                    {category.name}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}
