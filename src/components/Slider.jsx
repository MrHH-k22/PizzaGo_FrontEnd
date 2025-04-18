import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SimpleSlider() {
  var settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const images = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div className=" bg-white p-4">
      <Slider {...settings}>
        {images.map((id) => (
          <div key={id}>
            <img
              className="rounded-lg"
              src={`/imgs/${id}.png`}
              alt={`Slide ${id}`}
              style={{ width: "100%" }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SimpleSlider;
