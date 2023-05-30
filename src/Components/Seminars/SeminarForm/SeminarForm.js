import React from "react";
import { Controller, useForm } from "react-hook-form";
import { format } from "date-fns";
import { useHistory } from "react-router";
//----------------
import style from "./SeminarForm.module.scss";
import CustomTopTitle from "../../../shared/components/CustomTopTitle/CustomTopTitle";
import CustomizedTextField from "../../../shared/components/TextField/CustomizedTextField";
import CustomizedDateTimePicker from "../../../shared/components/DatetimePicker/CustomizedDateTimePicker";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";
import ImageUploader from "../ImageUploader/ImageUploader";
import { IconButton } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CloseIcon from "@mui/icons-material/Close";
import AutocompleteInput from "../../../shared/components/AutocompleteInput/AutocompleteInput";
//-------------------
import {
  seminarNameValidation,
  seminarPlaceValidation,
} from "../../../shared/constants/validationRules";
import {
  validationSeminarDate,
  validationSeminarImage,
} from "./seminarValidation";
import {
  BUTTON_LABEL,
  DATE_FORMAT,
  PLACE_HOLDER,
  TEXTFIELD_LABEL,
  TITLE,
  VALID_IMAGE_FILE_TYPE,
} from "../../../shared/constants/common";
//------------------
import { ROUTES } from "../../../shared/constants/navigation";
import { accountService } from "../../../Services/accountService";
import { seminarService } from "../../../Services/seminarService";
import { resourceService } from "../../../Services/resourceService";

const SeminarForm = () => {
  const history = useHistory();
  const [seminarBackground, setSeminarBackground] = React.useState(null);
  const [mentorList, setMentorList] = React.useState([]);
  const [seminarDate, setSeminarDate] = React.useState(new Date());
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      seminarBackground: null,
    },
  });

  const onFileChange = (newValue) => {
    if (newValue && VALID_IMAGE_FILE_TYPE.indexOf(newValue.type) >= 0) {
      setSeminarBackground(URL.createObjectURL(newValue));
    } else {
      setSeminarBackground(null);
    }
  };

  const onRemoveImage = () => {
    setSeminarBackground(null);
    setValue("seminarBackground", null);
  };

  const getOptionLabel = (option) => option.profile.fullName;

  const renderOptionSpeakerAutocomplete = (props, option) => (
    <li {...props} className={`${style.autocomplete__rowDropdown}`}>
      <div>{option.profile.fullName}</div>
      <div>{option.email}</div>
    </li>
  );

  const handleUploadImage = async (file) => {
    if (file) {
      let formData = new FormData();
      formData.append("image", file);
      return await resourceService.uploadImage(formData);
    }
  };

  const onSubmit = async (data) => {
    try {
      data.seminarSpeakers = data.seminarSpeakers.map((speaker) => speaker.id);
      data.seminarTime = format(
        data.seminarTime,
        DATE_FORMAT.BACK_END_YYYY_MM_DD__HH_mm_ss
      );
      const imageUrl = await handleUploadImage(data.seminarBackground);
      let requestBody = {
        name: data.seminarName,
        description: data.seminarDescription,
        location: data.seminarPlace,
        imageUrl: imageUrl,
        startTime: data.seminarTime,
        mentorIds: data.seminarSpeakers,
      };
      await seminarService.create(requestBody);
      history.push(ROUTES.SEMINAR_LIST);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const fetchMentorList = async () => {
      const result = await accountService.getAllMentors();
      setMentorList(result);
    };
    fetchMentorList();
  }, []);

  return (
    <Grid2 container className={`${style.seminarForm__container}`}>
      <form
        className={`${style.seminarForm__form}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid2 xs={12} md={6} className={`${style.seminarForm__gridContainer}`}>
          {seminarBackground ? (
            <div className={`${style.seminarForm__image}`}>
              <img src={seminarBackground} alt="seminar-poster" />
              <IconButton
                aria-label="remove"
                size="large"
                className={`${style.seminarForm__iconButton}`}
                onClick={onRemoveImage}
              >
                <CloseIcon />
              </IconButton>
            </div>
          ) : (
            <Controller
              name="seminarBackground"
              defaultValue={seminarBackground}
              control={control}
              rules={{
                validate: validationSeminarImage,
              }}
              render={({ field, fieldState }) => {
                return (
                  <ImageUploader
                    inputId="seminarBackground"
                    placeholder={PLACE_HOLDER.CHOOSE_IMAGE}
                    required={true}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                      onFileChange(e);
                    }}
                    name={field.name}
                    helperText={fieldState.error?.message}
                    error={fieldState.invalid}
                  />
                );
              }}
            />
          )}
        </Grid2>
        <Grid2 xs={12} md={6} className={`${style.seminarForm__gridContainer}`}>
          <CustomTopTitle title={TITLE.SEMINAR_INFO} />
          <CustomizedTextField
            inputId="seminarName"
            name={TEXTFIELD_LABEL.SEMINAR_NAME}
            required={true}
            options={{
              ...register("seminarName", seminarNameValidation),
            }}
            error={errors.seminarName ? true : false}
            helperText={errors?.seminarName?.message}
          />
          <Controller
            control={control}
            name="seminarTime"
            rules={{
              validate: validationSeminarDate,
            }}
            defaultValue={seminarDate}
            render={({ field: { onChange, ...restField }, fieldState }) => (
              <CustomizedDateTimePicker
                label={TEXTFIELD_LABEL.TIME}
                ampm={false}
                formName="seminarTime"
                required={true}
                onChange={(event) => {
                  onChange(event);
                  setSeminarDate(event);
                }}
                fieldState={fieldState}
                {...restField}
              />
            )}
          />
          <CustomizedTextField
            inputId="seminarPlace"
            name={TEXTFIELD_LABEL.SEMINAR_PLACE}
            required={true}
            options={{
              ...register("seminarPlace", seminarPlaceValidation),
            }}
          />

          <Controller
            control={control}
            name="seminarSpeakers"
            defaultValue={[]}
            render={({ field: { value, onChange, ...restField } }) => (
              <AutocompleteInput
                multiple={true}
                label="Speaker"
                required={true}
                id="autocomplete-speakers"
                options={mentorList}
                getOptionLabel={getOptionLabel}
                renderOption={renderOptionSpeakerAutocomplete}
                onChange={(e, data) => {
                  onChange(data);
                }}
                value={value.id}
                {...restField}
              />
            )}
          />
          <CustomizedTextField
            multiline
            maxRows={3}
            inputId="seminarDescription"
            name={TEXTFIELD_LABEL.SEMINAR_DESCRIPTION}
            required={false}
            options={{
              ...register("seminarDescription"),
            }}
          />

          <div className={`${style.seminarForm__button}`}>
            <CustomizedButton
              type="submit"
              variant="contained"
              color="primary600"
            >
              {BUTTON_LABEL.CREATE_SEMINAR}
            </CustomizedButton>
          </div>
        </Grid2>
      </form>
    </Grid2>
  );
};

export default SeminarForm;
