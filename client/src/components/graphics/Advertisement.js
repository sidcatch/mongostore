import React, { Fragment } from "react";

import ImageSlider from "ac-react-simple-image-slider";

const imageData = [
  {
    src: "/public/large-images/2007024_organic-store_400.webp",
    title: "Image 1",
  },
  {
    src:
      "/public/large-images/All_Home-Kitchen-Essentials_DT_3_1130x400_11thJuly.webp",
    title: "Image 2",
  },
];

const Advertisement = () => {
  return (
    <Fragment>
      <div
        style={{
          backgroundColor: "silver",
          marginBottom: "20px",
        }}
      >
        <ImageSlider
          height=""
          width="100vw"
          duration={100}
          showDots={false}
          data={imageData}
        />
      </div>
    </Fragment>
  );
};

export default Advertisement;
