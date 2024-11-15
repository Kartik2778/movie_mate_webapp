import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className="w-[95%] ml-[3%] mt-2">
      <Slider {...settings}>
        <div>
          <img
            className="w-full h-[83vh] object-cover"
            src="https://raw.githubusercontent.com/Kartik2778/project_images/main/poster2.jpg"
            alt="..."
          />
        </div>
        <div>
          <img
            className="w-full h-[83vh] object-cover"
            src="https://raw.githubusercontent.com/Kartik2778/project_images/main/poster1.png"
            alt="..."
          />
        </div>
      </Slider>
    </div>
  );
}
