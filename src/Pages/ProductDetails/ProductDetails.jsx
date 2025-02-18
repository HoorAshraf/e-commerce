import React, { useContext, useEffect, useState } from 'react';
import Loading from './../../Components/Loading/Loading';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext/Cart.Context';
import axios from 'axios';
import ReactImageGallery from 'react-image-gallery';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import Card from './../../Components/Card/Card';

export default function ProductDetails() {
    const [productDetails, setProductDetails] = useState(null);
    const [relatedProductDetails, setRelatedProductDetails] = useState(null);
    const { addProductToCart } = useContext(CartContext);
    let { id } = useParams();
    const navigate = useNavigate();

    async function getProductDetails(productId) {
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
            setProductDetails(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function getRelatedProducts() {
        if (!productDetails?.category?._id) return;
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetails.category._id}`);
            setRelatedProductDetails(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProductDetails(id);
    }, [id]);

    useEffect(() => {
        getRelatedProducts();
    }, [productDetails]);

    return (
        <>
            {productDetails ? (
                <section className='container mx-auto mt-20 p-8 bg-white shadow-lg rounded-xl border border-gray-200'>
                    <div className='flex flex-col md:flex-row gap-10'>
                        <div className='md:w-1/3 w-full'>
                            <ReactImageGallery
                                showNav={false}
                                autoPlay={true}
                                showPlayButton={false}
                                items={productDetails.images.map((image) => ({
                                    original: image,
                                    thumbnail: image,
                                }))}
                            />
                        </div>
                        <div className='md:w-2/3 w-full space-y-6'>
                            <h1 className='text-3xl font-bold text-gray-900'>{productDetails.title}</h1>
                            <h2 className='text-lg text-primary-700 font-semibold'>{productDetails.category?.name}</h2>
                            <p className='text-gray-600'>{productDetails.description}</p>
                            <div className='flex justify-between items-center text-lg font-medium'>
                                <span className='text-primary-800 font-bold'>{productDetails.price} L.E</span>
                                <div className='flex items-center gap-2'>
                                    <i className='fa-solid fa-star text-yellow-500'></i>
                                    <span>{productDetails.ratingsAverage}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => addProductToCart({ productId: id })}
                                className='px-6 py-3 bg-primary-700 hover:bg-primary-800 text-white font-semibold rounded-md transition-all w-full'
                            >
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </section>
            ) : (
                <Loading />
            )}

            {relatedProductDetails && (
                <section className="container mx-auto mt-16 px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Products</h2>
                    <Swiper
                        slidesPerView={5}
                        spaceBetween={20}
                        breakpoints={{
                            320: { slidesPerView: 1, spaceBetween: 10 },
                            640: { slidesPerView: 2, spaceBetween: 10 },
                            768: { slidesPerView: 3, spaceBetween: 12 },
                            1024: { slidesPerView: 4, spaceBetween: 15 },
                            1280: { slidesPerView: 5, spaceBetween: 15 },
                        }}
                    >
                        {relatedProductDetails.map((product) => (
                            <SwiperSlide key={product.id}>
                                <Card productInfo={product} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </section>
            )}
        </>
    );
}
