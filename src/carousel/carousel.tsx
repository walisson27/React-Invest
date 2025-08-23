import { useState } from "react";
import  "../../public/Img/city.jpg"


const images = [
  "/Img/city.jpg",    
  "/Img/city.jpg"
];


export default function Carousel() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div style={styles.carousel}>
      <button onClick={prevSlide} style={styles.button}>◀</button>
      
      <img src={images[current]} alt={`Slide ${current}`} style={styles.image} />
      
      <button onClick={nextSlide} style={styles.button}>▶</button>
    </div>
  );
}
const styles: { [key: string]: React.CSSProperties } = {
  carousel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    width: "100%",
    maxWidth: "600px",
    margin: "20px auto",
  },
  image: {
    width: "100%",
    maxWidth: "500px",
    height: "300px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  button: {
    background: "#333",
    color: "white",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: "5px",
  },
};