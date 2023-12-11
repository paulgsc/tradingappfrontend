const ImageCycle = ({ openIndex, currentImageIndex }) => {
  const images = Array(3)
    .fill()
    .map((_, i) => {
      const topics = ["finance", "houses", "technology"];
      const url = "https://source.unsplash.com/featured/";
      return `${url}?${topics[i]}&${openIndex}`;
    });

  return (
    <ul className="w-full">
      {images.map((image, i) => (
        <li
          key={i}
          style={{
            transform: `translateX(${i * 100 - currentImageIndex * 100}%)`,
          }}
          className="absolute inset-0 w-full transition-transform duration-500 ease-linear"
        >
          <img
            loading="lazy"
            src={image}
            className="w-full h-full object-cover z-50 pointer-events-none"
            alt="..."
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageCycle;
