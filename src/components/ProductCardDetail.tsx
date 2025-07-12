import React from "react";
import { ProductType } from "@/types/product.type";
import { QRCodeSVG } from "qrcode.react";

interface Props {
    product: ProductType;
}

const ProductCardDetail: React.FC<Props> = ({ product }) => {
    return (
      <div className="rounded-lg p-6 border shadow space-y-4">
          <div className="flex items-center gap-6">
              <img
                src={product.image}
                alt={product.title}
                className="w-48 h-48 rounded object-cover"
              />
              <QRCodeSVG
                value={product.productHash || "No hash"}
                size={128}
              />
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4">
              <p><strong>Tên:</strong> {product.title}</p>
              <p><strong>Danh mục:</strong> {product.category}</p>
              <p><strong>Giá:</strong> {product.price.toLocaleString()} VND/kg</p>
              <p><strong>Vận chuyển:</strong> {product.unitShipped} kg</p>
              <p><strong>Đã bán:</strong> {product.unitSold} kg</p>
              <p><strong>Còn lại:</strong> {product.unitOnHand} kg</p>
              <p><strong>Nhà cung cấp:</strong> {product.supplier}</p>
              <p><strong>Nơi trồng:</strong> {product.farmLocation}</p>
              <p><strong>Ngày bán:</strong> {product.saleDate.toLocaleDateString()}</p>
              <p><strong>Hash:</strong> {product.productHash}</p>
          </div>
      </div>
    );
};

export default ProductCardDetail;