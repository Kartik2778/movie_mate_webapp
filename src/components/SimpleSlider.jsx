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
    <div className="w-[90%] ml-[5%] mt-5 mb-5">
      <Slider {...settings}>
        <div>
          <img
            className="w-full h-[83vh] object-cover"
            src="https://raw.githubusercontent.com/Kartik2778/project_images/main/venom.png"
            alt="..."
          />
        </div>
        <div>
          <img
            className="w-full h-[82vh] object-cover"
            src="https://raw.githubusercontent.com/Kartik2778/project_images/main/batman.jpg"
            alt="..."
          />
        </div>
      </Slider>
    </div>
  );
}
