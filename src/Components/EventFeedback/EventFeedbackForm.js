import React from "react";
import CustomTopTitle from "../../shared/components/CustomTopTitle/CustomTopTitle";
import { TITLE } from "../../shared/constants/common";
import style from "./EventFeedbackForm.module.scss";
import RatingInput from "../../shared/components/RatingInput/RatingInput";
import RadioSelect from "../../shared/components/RadioSelect/RadioSelect";
import CustomizedTextField from "../../shared/components/TextField/CustomizedTextField";
import { feedbackQuestionList } from "./defaultQuestionList";
import CustomizedButton from "../../shared/components/Button/CustomizedButton";

const EventFeedbackForm = () => {
  const renderInput = (questionObject) => {
    switch (questionObject.type) {
      case "RATING":
        return (
          <RatingInput
            key={questionObject.id}
            title={questionObject.id + ". " + questionObject.question}
          />
        );
      case "YES/NO":
        return (
          <RadioSelect
            key={questionObject.id}
            title={questionObject.id + ". " + questionObject.question}
          />
        );
      case "TEXT":
        return (
          <CustomizedTextField
            key={questionObject.id}
            inputId={"question" + questionObject.id}
            name={questionObject.id + ". " + questionObject.question}
          />
        );
    }
  };

  return (
    <div className={`${style.eventFeedback__container}`}>
      <form className={`${style.eventFeedback__form}`}>
        <CustomTopTitle title={TITLE.EVENT_FEEDBACK} />
        {feedbackQuestionList.map((item) => renderInput(item))}

        <CustomizedButton type="submit" variant="contained" color="primary600">
          Gửi khảo sát
        </CustomizedButton>
      </form>
    </div>
  );
};

export default EventFeedbackForm;
