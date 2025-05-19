// src/pages/components/ImageGallery.tsx
type Props = {
  images: string[];
  mainImage: string;
  setMainImage: (image: string) => void;
};

const ImageGallery = ({ images, mainImage, setMainImage }: Props) => {
  if (!images || images.length === 0) return <p>Nenhuma imagem disponível.</p>;

  return (
    <div className="flex flex-col gap-4">
      {/* Imagem principal */}
      <img
        src={mainImage}
        alt="Imagem principal do produto"
        className="w-full h-[400px] object-contain border rounded-lg"
      />

      {/* Miniaturas */}
      <div className="flex gap-2 overflow-x-auto">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Miniatura ${idx}`}
            className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
              mainImage === img ? "border-blue-500" : "border-transparent"
            }`}
            onClick={() => {
              console.log("Imagem clicada:", img); // deve aparecer no console
              setMainImage(img);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
