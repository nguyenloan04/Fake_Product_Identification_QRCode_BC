import React, { useEffect, useState } from "react";
import { ProductType } from "@/types/product.type";
import { QRCodeSVG } from "qrcode.react";
import { getLogsByProductId } from "@/services/product.service";

interface Props {
    product: ProductType;
}

const ProductCardDetail: React.FC<Props> = ({ product }) => {
  const [logs, setLogs] = useState<string[]>([]);
  useEffect(() => {
    getLogsByProductId(product.id).then(setLogs);
  }, [product.id]);

  const qrValue = `
Lịch sử thay đổi:
${logs.join("\n\n")}
`;
    return (
      <div className="rounded-lg p-6 border shadow space-y-4">
          <div className="flex items-center gap-6">
              <img
                src={product.image}
                alt={product.title}
                className="w-48 h-48 rounded object-cover"
              />
              <QRCodeSVG
                value={qrValue || "No hash"}
                size={250}
              />
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4">
              <p><strong>Tên:</strong> {product.title}</p>
              <p><strong>Danh mục:</strong> {product.category}</p>
              <p><strong>Giá:</strong> {product.price.toLocaleString()} VND/kg</p>
              <p><strong>Vận chuyển:</strong> {product.unitShipped.toLocaleString()} kg</p>
              <p><strong>Đã bán:</strong> {product.unitSold.toLocaleString()} kg</p>
              <p><strong>Còn lại:</strong> {product.unitOnHand.toLocaleString()} kg</p>
              <p><strong>Nhà cung cấp:</strong> {product.supplier}</p>
              <p><strong>Nơi sản xuất:</strong> {product.farmLocation}</p>
              <p><strong>Ngày bán:</strong> {product.saleDate.toLocaleDateString()}</p>
          </div>
      </div>
    );
};

export default ProductCardDetail;