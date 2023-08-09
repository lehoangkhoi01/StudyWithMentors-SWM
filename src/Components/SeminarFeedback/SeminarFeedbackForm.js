import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import CustomTopTitle from "../../shared/components/CustomTopTitle/CustomTopTitle";
import { TITLE } from "../../shared/constants/common";
import style from "./SeminarFeedbackForm.module.scss";
import RatingInput from "../../shared/components/RatingInput/RatingInput";
import RadioSelect from "../../shared/components/RadioSelect/RadioSelect";
import CustomizedTextField from "../../shared/components/TextField/CustomizedTextField";
import CustomizedButton from "../../shared/components/Button/CustomizedButton";
import SendFeedbackSuccess from "./SendFeedbackSuccess/SendFeedbackSuccess";
import { seminarFeedbackService } from "../../Services/seminarFeedbackService";
import { useForm, Controller } from "react-hook-form";
import { useCustomLoading } from "../../Helpers/generalHelper";
import { useHistory } from "react-router";
import { ROUTES } from "../../shared/constants/navigation";
import { seminarFeedbackValidationField } from "./seminarFeedbackValidation";
import { seminarService } from "../../Services/seminarService";
import { Typography } from "@mui/material";

const SeminarFeedbackForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const { setLoading } = useCustomLoading();
  const [seminarDetail, setSeminarDetail] = React.useState(null);
  const [questionList, setQuestionList] = React.useState([]);
  const [isSendSuccess, setIsSendSuccess] = React.useState(false);
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();

  const renderInput = (questionObject, index) => {
    switch (questionObject.type) {
      case "RATING":
        return (
          <Controller
            key={`INPUT_${index}`}
            name={`question${index}`}
            control={control}
            defaultValue={0}
            rules={{
              validate: seminarFeedbackValidationField,
            }}
            render={({ field }) => (
              <RatingInput
                title={questionObject.question}
                field={field}
                name="rating"
                onChange={(event, value) => field.onChange(value)}
                error={errors[`question${index}`]}
              />
            )}
          />
        );
      case "YES/NO":
        return (
          <Controller
            key={`INPUT_${index}`}
            control={control}
            name={`question${index}`}
            rules={{
              validate: seminarFeedbackValidationField,
            }}
            defaultValue={""}
            render={({ field }) => (
              <RadioSelect
                title={questionObject.question}
                field={field}
                name="radio"
                onChange={(event, value) => field.onChange(value)}
                error={errors[`question${index}`]}
              />
            )}
          />
        );
      case "TEXT":
        return (
          <CustomizedTextField
            key={`INPUT_${index}`}
            optional={true}
            multiline={true}
            inputId={"question" + index}
            name={questionObject.question}
            options={{
              ...register(`question${index}`),
            }}
          />
        );
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    // //Process data
    let answers = [...questionList];
    answers.forEach((item, index) => {
      item.answer = data[`question${index}`];
    });
    const requestBody = {
      results: answers,
    };

    try {
      await seminarFeedbackService.send(id, requestBody);
      setIsSendSuccess(true);
    } catch (error) {
      if (error.status == "500") {
        history.push(ROUTES.SERVER_ERROR);
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const fetchQuestionList = async () => {
      try {
        const result = await seminarFeedbackService.getQuestion(id);
        setQuestionList(result.questions);
      } catch (error) {
        if (error.status == "404") {
          history.push(ROUTES.NOT_FOUND);
        } else {
          history.push(ROUTES.SERVER_ERROR);
        }
      }
    };
    const fetchSeminarDetail = async () => {
      try {
        const seminarDetail = await seminarService.getSeminarDetail(id);
        if (new Date(seminarDetail.startTime) > new Date()) {
          history.push(ROUTES.NOT_FOUND);
        }
        setSeminarDetail(seminarDetail);
      } catch (error) {
        if (error.status == "404") {
          history.push(ROUTES.NOT_FOUND);
        }
        if (error.status == "500") {
          history.push(ROUTES.SERVER_ERROR);
        }
      }
    };

    fetchQuestionList();
    fetchSeminarDetail();
  }, []);

  if (isSendSuccess) {
    return <SendFeedbackSuccess />;
  } else {
    return (
      <div className={`${style.eventFeedback__container}`}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${style.eventFeedback__form}`}
        >
          <CustomTopTitle title={TITLE.EVENT_FEEDBACK} />
          <Typography textAlign="center" variant="h6">
            {seminarDetail?.name}
          </Typography>
          {questionList.map((item, index) => renderInput(item, index))}
          <CustomizedButton
            type="submit"
            variant="contained"
            color="primary600"
          >
            Gửi khảo sát
          </CustomizedButton>
        </form>
      </div>
    );
  }
};

export default SeminarFeedbackForm;
