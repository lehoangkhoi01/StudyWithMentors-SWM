import React from "react";
import style from "./SeminarForm.module.scss";
import CustomTopTitle from "../../../shared/components/CustomTopTitle/CustomTopTitle";
import CustomizedTextField from "../../../shared/components/TextField/CustomizedTextField";
import CustomizedDateTimePicker from "../../../shared/components/DatetimePicker/CustomizedDateTimePicker";
import { Controller, useForm } from "react-hook-form";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";
import { registerFullNameValidation } from "../../../shared/constants/validationRules";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CloseIcon from "@mui/icons-material/Close";
import { accountService } from "../../../Services/accountService";
import AutocompleteInput from "../../../shared/components/AutocompleteInput/AutocompleteInput";
import { resourceService } from "../../../Services/resourceService";
import { format } from "date-fns";
import { DATE_FORMAT } from "../../../shared/constants/common";
import { seminarService } from "../../../Services/seminarService";
import { useHistory } from "react-router";
import { ROUTES } from "../../../shared/constants/navigation";
import ImageUploader from "../ImageUploader/ImageUploader";
import { IconButton } from "@mui/material";

const SeminarForm = () => {
  const history = useHistory();
  const [seminarBackground, setSeminarBackground] = React.useState(null);
  const [mentorList, setMentorList] = React.useState([]);
  const [seminarDate, setSeminarDate] = React.useState(new Date());
  const { control, handleSubmit, register, setValue } = useForm({
    defaultValues: {
      seminarBackground: null,
    },
  });

  const onFileChange = (newValue) => {
    if (newValue) {
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
    const result = await seminarService.create(requestBody);
    console.log(result);
    history.push(ROUTES.SEMINAR_LIST);
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
              render={({ field, fieldState }) => {
                return (
                  <ImageUploader
                    inputId="seminarBackground"
                    label="Hình ảnh"
                    placeholder="Bấm hoặc kéo file để tải poster"
                    required={true}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                      onFileChange(e);
                    }}
                    name={field.name}
                    helperText={fieldState.invalid ? "File is invalid" : ""}
                    error={fieldState.invalid}
                  />
                );
              }}
            />
          )}
        </Grid2>
        <Grid2 xs={12} md={6} className={`${style.seminarForm__gridContainer}`}>
          <CustomTopTitle title="Thông tin sự kiện" />
          <CustomizedTextField
            inputId="seminarName"
            name="Tên sự kiện"
            required={true}
            options={{
              ...register("seminarName", registerFullNameValidation),
            }}
          />
          <Controller
            control={control}
            name="seminarTime"
            defaultValue={seminarDate}
            render={({ field: { onChange, ...restField } }) => (
              <CustomizedDateTimePicker
                label="Thời gian"
                ampm={false}
                formName="seminarTime"
                required={true}
                onChange={(event) => {
                  onChange(event);
                  setSeminarDate(event);
                }}
                {...restField}
              />
            )}
          />
          <CustomizedTextField
            inputId="seminarPlace"
            name="Địa điểm"
            required={true}
            options={{
              ...register("seminarPlace", registerFullNameValidation),
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
                id="combo-box-demo"
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
            name="Thông tin chi tiết"
            required={true}
            options={{
              ...register("seminarDescription", registerFullNameValidation),
            }}
          />

          <div className={`${style.seminarForm__button}`}>
            <CustomizedButton
              type="submit"
              variant="contained"
              color="primary600"
            >
              Xác nhận
            </CustomizedButton>
          </div>
        </Grid2>
      </form>
    </Grid2>
  );
};

export default SeminarForm;
