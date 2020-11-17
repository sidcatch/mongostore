import React, { useState, useEffect, Fragment } from "react";

import carouselStyles from "./Carousel.module.css";

import prevImg from "./prev.svg";
import nextImg from "./next.svg";

let timer;
const INTERVAL = 3000;
const resetInterval = (prevInterval, setState) => {
  clearInterval(prevInterval);
  let timer = setInterval(() => {
    setState((prevState) => ({
      ...prevState,
      counter: prevState.counter + 1,
      shouldTransition: true,
    }));
  }, INTERVAL);
  return timer;
};

const Carousel = ({
  images,
  carouselWidth,
  carouselWidthUnit,
  carouselHeight,
  carouselHeightUnit,
}) => {
  const [carouselState, setCarouselState] = useState({
    counter: 1,
    shouldTransition: true,
  });
  let { counter, shouldTransition } = carouselState;

  useEffect(() => {
    timer = setInterval(() => {
      setCarouselState((prevState) => ({
        ...prevState,
        counter: prevState.counter + 1,
        shouldTransition: true,
      }));
    }, INTERVAL);
    return () => clearTimeout(timer);
  }, []);

  const next = () => {
    timer = resetInterval(timer, setCarouselState);
    if (counter > images.length) return;
    setCarouselState((prevState) => ({
      ...prevState,
      counter: prevState.counter + 1,
      shouldTransition: true,
    }));
  };

  const previous = () => {
    timer = resetInterval(timer, setCarouselState);
    if (counter < 1) return;
    setCarouselState((prevState) => ({
      ...prevState,
      counter: prevState.counter - 1,
      shouldTransition: true,
    }));
  };

  const transitionEnd = () => {
    let lastCloneCounter = 0;
    let firstCloneCounter = images.length + 1;
    if (counter <= lastCloneCounter)
      setCarouselState((prevState) => ({
        ...prevState,
        counter: images.length,
        shouldTransition: false,
      }));

    if (counter >= firstCloneCounter)
      setCarouselState((prevState) => ({
        ...prevState,
        counter: 1,
        shouldTransition: false,
      }));
  };

  return (
    <Fragment>
      <div
        className={carouselStyles.carouselContainer}
        style={{
          width: `${carouselWidth}${carouselWidthUnit}`,
          height: `${carouselHeight}${carouselHeightUnit}`,
        }}
      >
        <button className={carouselStyles.prevBtn} onClick={previous}>
          <img src={prevImg} className={carouselStyles.prevImg} alt="" />
        </button>
        <button className={carouselStyles.nextBtn} onClick={next}>
          <img src={nextImg} className={carouselStyles.nextImg} alt="" />
        </button>
        <div
          className={carouselStyles.carouselSlide}
          style={{
            transform: `translateX(${
              -carouselWidth * counter
            }${carouselWidthUnit})`,
            transition: `${
              shouldTransition ? "transform 0.4s ease-in-out" : "none"
            }`,
          }}
          onTransitionEnd={transitionEnd}
        >
          <img
            src={images[images.length - 1]}
            className={carouselStyles.img}
            style={{
              width: `${carouselWidth}${carouselWidthUnit}`,
              height: `${carouselHeight}${carouselHeightUnit}`,
            }}
            alt=""
          ></img>

          {images.map((image, index) => (
            <img
              src={image}
              className={carouselStyles.img}
              style={{
                width: `${carouselWidth}${carouselWidthUnit}`,
                height: `${carouselHeight}${carouselHeightUnit}`,
              }}
              alt=""
              key={index}
            ></img>
          ))}
          <img
            src={images[0]}
            className={carouselStyles.img}
            style={{
              width: `${carouselWidth}${carouselWidthUnit}`,
              height: `${carouselHeight}${carouselHeightUnit}`,
            }}
            alt=""
          ></img>
        </div>
      </div>
    </Fragment>
  );
};

export default Carousel;
