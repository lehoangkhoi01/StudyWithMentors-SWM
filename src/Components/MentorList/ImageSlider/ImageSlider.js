import React from "react";
import SwipeableViews from "react-swipeable-views";
import { Box } from "@mui/material";
import MobileStepper from "@mui/material/MobileStepper";
import { autoPlay } from "react-swipeable-views-utils";
import { styled } from "@mui/material/styles";
import style from "./ImageSlider.module.scss";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const images = [
  {
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250",
  },
];

export const StyledStepper = styled(MobileStepper)`
  position: absolute;
  bottom: 2px;
  background-color: transparent;
  justify-content: center;
  & .MuiMobileStepper-dot {
    border-radius: 4px;
    width: 80px;
  }
  & .MuiMobileStepper-dotActive {
    background-color: #3948ab;
  }
`;

const ImageSlider = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;
  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={`${style.imageSlider__wrapper}`}>
      <AutoPlaySwipeableViews
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={`SLIDER_IMAGE_${index}`}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 255,
                  display: "block",
                  overflow: "hidden",
                  width: "100%",
                }}
                src={require("../../../assets/imageSlider.png")}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <StyledStepper steps={maxSteps} activeStep={activeStep} />
    </div>
  );
};

export default ImageSlider;
