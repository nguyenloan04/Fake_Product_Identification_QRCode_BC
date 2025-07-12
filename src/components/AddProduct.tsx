"use client";
// sửa sau
import React, { useState } from "react";
import { ethers } from "ethers";
import ProductABI from "@/abis/MainSystem.json";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 

export const AddProduct: React.FC = () => {
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddProduct = async () => {
    if (!window.ethereum) {
      alert("Vui lòng cài MetaMask!");
      return;
    }

    try {
      setLoading(true);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ProductABI.abi, signer);

      const tx = await contract.addProduct(name, origin);
      await tx.wait(); // đợi transaction confirm

      alert("Thêm sản phẩm thành công!");

      // Reset form
      setName("");
      setOrigin("");
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi thêm sản phẩm!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">Thêm sản phẩm mới</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Tên sản phẩm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full rounded"
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Xuất xứ"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="border p-2 w-full rounded"
        />
      </div>

      <button
        onClick={handleAddProduct}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        {loading ? "Đang thêm..." : "Thêm sản phẩm"}
      </button>
    </div>
  );
};
