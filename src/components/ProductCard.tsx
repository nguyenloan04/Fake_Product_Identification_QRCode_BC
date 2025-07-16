import React, { useEffect, useState } from "react";
import { ProductCardType } from "@/types/product.type";
import { Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { getLogsByProductId } from "@/services/product.service";

interface Props {
  product: ProductCardType;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const [logs, setLogs] = useState<string[]>([]);
  useEffect(() => {
    getLogsByProductId(product.id).then(setLogs);
  }, [product.id]);

  const qrValue = `
Lịch sử thay đổi:
${logs.join("\n\n")}
`;


  return (
    <div className="rounded-xl shadow-md p-4 border space-y-2">
      <img
        src={product.image}
        alt={product.title}
        className="w-24 h-24 object-cover rounded-md"
      />
      <div className="flex-1 space-y-1">
        <h2 className="text-lg font-bold text-green-700">{product.title}</h2>
        <p className="text-sm text-gray-600">Danh mục: {product.category}</p>
        <p className="font-semibold text-black">
          Giá: {product.price.toLocaleString()} VND/kg
        </p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <Link to={`/product/${product.id}`} className="text-sm text-green-700 underline">
          Chi tiết
        </Link>
        <div className="md">
          <QRCodeSVG
            value={`${qrValue}`}
            size={129}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;