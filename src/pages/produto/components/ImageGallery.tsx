// src/components/ImageGallery.tsx
type Props = {
  images: string[];
  mainImage: string;
  setMainImage: (src: string) => void;
};

const ImageGallery = ({ images, mainImage, setMainImage }: Props) => {
  return (
    <div className="w-full flex flex-col items-center md:w-[35%] gap-4">
      <div className="w-full aspect-square">
        <img
          src={mainImage}
          alt="Produto"
          className="rounded-xl w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Miniatura ${i + 1}`}
            onClick={() => setMainImage(img)}
            className={`w-14 h-14 object-cover rounded-md cursor-pointer border transition duration-200 ${
              mainImage === img ? "border-blue-500" : "border-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
