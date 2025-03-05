import ProductCardDetail from "@/components/ProductCardDetail.tsx";
import Header from "@/components/Header.tsx";
import React, {useEffect, useState} from "react";
import Footer from "@/components/Footer.tsx";
import Product from "@/components/Products.tsx";
import {useLocation, useParams} from "react-router";
import {getProductById} from "@/services/product.service.ts";
import {ProductType} from "@/types/product.type.ts";

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