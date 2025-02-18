import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../../Components/Loading/Loading';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Card from '../../Components/Card/Card';

export default function Brands() {
    const [brands, setBrands] = useState(null);
    const [loading, setLoading] = useState(false);
    const [relatedProducts, setRelatedProducts] = useState(null);
    const BaseUrl = 'https://ecommerce.routemisr.com';

    async function getBrands() {
        setLoading(true);
        try {
            const { data } = await axios.get(`${BaseUrl}/api/v1/brands`);
            setBrands(data?.data);
        } catch (error) {
            console.error("Error fetching brands:", error);
        } finally {
            setLoading(false);
        }
    }

    async function fetchRelatedProducts(brandId) {
        setLoading(true);
        try {
            const { data } = await axios.get(`${BaseUrl}/api/v1/products?brand=${brandId}`);
            setRelatedProducts(data?.data);
        } catch (error) {
            console.error("Error fetching related products:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getBrands();
    }, []);

    return (
        <>
            <section className="container mx-auto my-10 px-6">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center tracking-wide uppercase">Top Brands</h2>
                {loading ? (
                    <Loading />
                ) : (
                    <div className="grid sm:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-6">
                        {brands?.map((brand) => (
                            <div
                                key={brand._id}
                                className="brand-card group p-5 shadow-lg rounded-xl border border-gray-300 transition-transform duration-300 hover:scale-110 cursor-pointer text-center hover:shadow-2xl"
                                onClick={() => fetchRelatedProducts(brand._id)}
                            >
                                <img
                                    src={brand.image}
                                    alt={brand.name}
                                    className="w-full h-48 object-contain p-3 rounded-md transition-opacity duration-300 hover:opacity-80"
                                />
                                <h1 className="mt-4 text-xl font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
                                    {brand.name}
                                </h1>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {relatedProducts && (
                <section className="container mx-auto px-6 my-10">
                    <h2 className="text-3xl font-semibold text-gray-800 my-6 text-center">Recommended Products</h2>
                    <Swiper
                        slidesPerView={5}
                        spaceBetween={20}
                        breakpoints={{
                            320: { slidesPerView: 1, spaceBetween: 10 },
                            640: { slidesPerView: 2, spaceBetween: 10 },
                            768: { slidesPerView: 3, spaceBetween: 12 },
                            1024: { slidesPerView: 4, spaceBetween: 20 },
                            1280: { slidesPerView: 5, spaceBetween: 20 },
                            1536: { slidesPerView: 6, spaceBetween: 20 },
                        }}
                        className="pb-6"
                    >
                        {relatedProducts.map((product) => (
                            <SwiperSlide key={product.id} className="transition-transform duration-300 hover:scale-105">
                                <Card productInfo={product} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </section>
            )}
        </>
    );
}
