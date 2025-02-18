import React, { useEffect, useState } from 'react';
import Loading from '../../Components/Loading/Loading';
import axios from 'axios';
import Card from '../../Components/Card/Card';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchProducts() {
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
            setProducts(data?.data || []);
        } catch (error) {
            console.error("Failed to fetch products", error);
            setError("Failed to load products. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <section className="container mx-auto mt-20 p-10 bg-white shadow-xl rounded-xl border border-gray-200">
            <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">Discover Our Best Products</h1>
            <p className="text-center text-gray-600 text-lg mb-6">Browse our top-quality products and find the best deals for you.</p>
            
            {loading ? (
                <Loading />
            ) : error ? (
                <div className="text-center text-red-600 text-lg font-semibold">{error}</div>
            ) : (
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <Card productInfo={product} key={product.id} />
                        ))
                    ) : (
                        <div className="text-center text-gray-600 text-lg font-semibold">No products available at the moment.</div>
                    )}
                </div>
            )}
        </section>
    );
}
