// src/pages/ProductPage.tsx
import { useEffect, useState } from "react";
import ImageGallery from "./components/ImageGallery";
import VariantSelector from "./components/VariantSelector";
import CepChecker from "./components/CepChecker";
import { productData } from "./productData";

const ProductPage = () => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState(productData.images[0]);

  // Recupera dados do localStorage ao carregar
  useEffect(() => {
    const savedData = localStorage.getItem("product-selection");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      if (Date.now() - parsed.timestamp < 15 * 60 * 1000) {
        setSelectedSize(parsed.size);
        setSelectedColor(parsed.color);
        setMainImage(parsed.image);
      } else {
        localStorage.removeItem("product-selection");
      }
    }
  }, []);

  // Salva alterações no localStorage
  useEffect(() => {
    localStorage.setItem(
      "product-selection",
      JSON.stringify({
        size: selectedSize,
        color: selectedColor,
        image: mainImage,
        timestamp: Date.now(),
      })
    );
  }, [selectedSize, selectedColor, mainImage]);

  return (
    <main className="max-w-7xl mx-auto p-6 grid md:grid-cols-2 gap-10">
      <ImageGallery
        images={productData.images}
        mainImage={mainImage}
        setMainImage={setMainImage}
      />

      <section className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">{productData.title}</h1>
        <p className="text-2xl text-green-600 font-semibold">
          R$ {productData.price.toFixed(2)}
        </p>

        <VariantSelector
          label="Tamanho"
          options={productData.variants.size}
          selected={selectedSize}
          onChange={setSelectedSize}
        />
        <VariantSelector
          label="Cor"
          options={productData.variants.color}
          selected={selectedColor}
          onChange={setSelectedColor}
        />

        <CepChecker />
      </section>
    </main>
  );
};

export default ProductPage;
