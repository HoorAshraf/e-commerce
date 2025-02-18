import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../../Components/Loading/Loading';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Card from '../../Components/Card/Card';

export default function Category() {
    const [categories, setCategories] = useState(null);
    const [subcategories, setSubcategories] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState(null);
    const [loading, setLoading] = useState(false);

    const BaseUrl = 'https://ecommerce.routemisr.com';

    async function getCategories() {
        try {
            const { data } = await axios.get(`${BaseUrl}/api/v1/categories`);
            setCategories(data?.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    async function getDetailsByCategory(catId) {
        setLoading(true);
        try {
            const subcategoryResponse = await axios.get(`${BaseUrl}/api/v1/subcategories?category=${catId}`);
            setSubcategories(subcategoryResponse?.data?.data);

            const productResponse = await axios.get(`${BaseUrl}/api/v1/products?category=${catId}`);
            setRelatedProducts(productResponse?.data?.data);
        } catch (error) {
            console.error("Error fetching details:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <section className="container mx-auto mt-24 p-8 bg-white shadow-xl rounded-xl border border-gray-200">
            <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">Discover Our Categories</h1>
            {!categories ? (
                <Loading />
            ) : (
                <div className="grid cursor-pointer gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                    {categories.map((category) => (
                        <div
                            key={category._id}
                            className="card group p-5 shadow-lg rounded-lg overflow-hidden border border-gray-300 hover:border-primary-800 transition-transform duration-300 transform hover:scale-105 text-center"
                            onClick={() => getDetailsByCategory(category._id)}
                        >
                            <img
                                src={category.image}
                                className="w-full h-64 object-cover rounded-t-lg transition-opacity duration-300 group-hover:opacity-80"
                                alt={category.name}
                            />
                            <h1 className="py-3 text-xl font-bold text-gray-900 group-hover:text-primary-800 transition-colors duration-300">{category.name}</h1>
                        </div>
                    ))}
                </div>
            )}

            {loading ? (
                <Loading />
            ) : (
                subcategories && (
                    <div className="p-8 mt-12 bg-gray-50 rounded-lg shadow-md">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Subcategories</h2>
                        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                            {subcategories.map((subcategory) => (
                                <div
                                    key={subcategory._id}
                                    className="subcategory-card shadow-lg p-5 rounded-lg border border-gray-300 hover:border-primary-800 transition-transform duration-300 transform hover:scale-105 text-center cursor-pointer"
                                >
                                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-800 transition-colors duration-300">{subcategory.name}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            )}

            {loading ? (
                <Loading />
            ) : (
                relatedProducts && (
                    <section className="px-8 md:px-16 lg:px-24 mt-14">
                        <h2 className="text-3xl text-gray-900 font-bold mb-10">Featured Products</h2>
                        <Swiper
                            slidesPerView={5}
                            spaceBetween={20}
                            breakpoints={{
                                320: { slidesPerView: 1, spaceBetween: 10 },
                                640: { slidesPerView: 2, spaceBetween: 12 },
                                768: { slidesPerView: 3, spaceBetween: 15 },
                                1024: { slidesPerView: 4, spaceBetween: 20 },
                                1280: { slidesPerView: 5, spaceBetween: 20 },
                            }}
                        >
                            {relatedProducts.map((product) => (
                                <SwiperSlide key={product._id}>
                                    <Card productInfo={product} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </section>
                )
            )}
        </section>
    );
}