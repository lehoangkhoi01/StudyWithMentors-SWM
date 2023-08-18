import React from "react";
import SwipeableViews from "react-swipeable-views";
import { Box } from "@mui/material";
import MobileStepper from "@mui/material/MobileStepper";
import { autoPlay } from "react-swipeable-views-utils";
import { styled } from "@mui/material/styles";
import style from "./ImageSlider.module.scss";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

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
  const images = [
    {
      imgPath:
        "../../../assets/Mentor_Slider_1.jpg",
    },
    {
      imgPath:
        "../../../assets/Mentor_Slider_2.jpg",
    },
    {
      imgPath:
        "../../../assets/Mentor_Slider_3.jpg",
    },
  ];

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
                  display: "block",
                  overflow: "hidden",
                  width: "100%",
                }}
                src={require(`../../../assets/Mentor_Slider_${index + 1}.jpg`)}
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
