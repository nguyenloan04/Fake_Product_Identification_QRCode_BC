import {useState} from "react";
import {Icon} from "@iconify/react";
import {ProductType} from "@/types/product.type";

const ProductCardDetail = ({ title, image,category,farmLocation,price,supplier}: ProductType) => {
    const [quantity, setQuantity] = useState(1);

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    return (
        <div className="  bg-gray-100">
            <div className="container flex">
            <div className="flex-none my-5 relative overflow-hidden rounded-2xl max-h-[500px] w-1/2">
                <img
                    src={image}
                    alt="Pomegranate"
                    className="object-cover w-full h-full "
                />
                {/*function*/}
                {/*hash*/}
                <button className="absolute top-2 left-2 shadow rounded-xs">
                    <Icon icon="clarity:qr-code-line" width="36" height="36"/>
                </button>
            </div>
            <div className="flex flex-col justify-between px-10  w-1/2 my-24">
                <h2 className="text-2xl font-semibold">{title}</h2>
                <h3 className="text-xl font-semibold">Category:&nbsp; {category}</h3>
                <div className="flex justify-start text-gray-600 ">
                    <p className="mr-5">Supplier: <span className="font-semibold text-black">{supplier}</span>
                    </p>
                    <p className=" ">Farm location: <span className="font-semibold text-black">{farmLocation}</span></p>
                </div>
                <div className="flex items-center justify-start text-gray-600 ">
                    <p className={""}> Price: &nbsp;</p>
                    {/*pass price_per_kg*/}
                    <p className="font-bold text-green-500">${price}/KG</p>
                </div>
                <div className="flex items-center mt-4">
                    <span className="mr-2 mr-5">Weight:</span>
                    <button onClick={handleDecrease} className="px-2 py-1 border rounded-md">-</button>
                    <span className="mx-2">{quantity}</span>
                    <button onClick={handleIncrease} className="px-2 py-1 border rounded-md">+</button>
                </div>

                <button className="mt-4 bg-[#37913a] text-white py-2 rounded-md hover:bg-[#2C742F]">
                    Add to Cart
                </button>
            </div>
            </div>
        </div>
    );
}
export default ProductCardDetail;