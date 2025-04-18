import ProductCardDetail from "@/components/ProductCardDetail";
import Header from "@/components/Header";
import React, {useEffect, useState} from "react";
import Footer from "@/components/Footer";
import Product from "@/components/Products";
import {useLocation, useParams} from "react-router";
import {getProductById} from "@/services/product.service";
import {ProductType} from "@/types/product.type";

const ProductDetail = () => {
    const {id} = useParams();
    const [product, setProduct] = useState<ProductType | null>(null);

    useEffect(() => {
        if (id) {
            getProductById(id).then(data => setProduct(data)).catch(e => console.log(e));
            window.scrollTo({top: 0, behavior: "smooth"});

        }
    }, [id]);

    return <>
        <Header/>
        <ProductCardDetail {...product}/>
        <span className="mt-14 block"></span>
        <Product title="I may also like"/>
        <span className="mt-14 block"></span>
        <Footer/>
    </>
}
export default ProductDetail