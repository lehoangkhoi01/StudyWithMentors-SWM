import React from "react";
import style from "./SeminarForm.module.scss";
import CustomTopTitle from "../../../shared/components/CustomTopTitle/CustomTopTitle";
import CustomizedTextField from "../../../shared/components/TextField/CustomizedTextField";
import CustomizedDateTimePicker from "../../../shared/components/DatetimePicker/CustomizedDateTimePicker";
import { Controller, useForm } from "react-hook-form";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";
import { MuiFileInput } from "mui-file-input";
import { registerFullNameValidation } from "../../../shared/constants/validationRules";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
//import FileInput from "../../../shared/components/FileInput/FileInput";

const SeminarForm = () => {
  const [seminarBackground, setSeminarBackground] = React.useState(null);
  const { control, handleSubmit, register } = useForm({
    defaultValues: {
      file: undefined,
    },
  });

  const onFileChange = (newValue) => {
    console.log(newValue);
    if (newValue) {
      setSeminarBackground(URL.createObjectURL(newValue));
    } else {
      setSeminarBackground(null);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Grid2 container className={`${style.seminarForm__container}`}>
      <Grid2 xs={12} md={6} className={`${style.seminarForm__gridContainer}`}>
        <div className={`${style.seminarForm__image}`}>
          <img src={seminarBackground} />
        </div>
      </Grid2>
      <Grid2 xs={12} md={6} className={`${style.seminarForm__gridContainer}`}>
        <form
          className={`${style.seminarForm__form}`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <CustomTopTitle title="Thông tin sự kiện" />
          <CustomizedTextField
            inputId="seminarName"
            name="Tên sự kiện"
            required={true}
            options={{
              ...register("seminarName", registerFullNameValidation),
            }}
          />
          <CustomizedDateTimePicker
            name="Thời gian"
            formName="seminarTime"
            required={true}
          />
          <CustomizedTextField
            inputId="seminarPlace"
            name="Địa điểm"
            required={true}
            options={{
              ...register("seminarPlace", registerFullNameValidation),
            }}
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
          {/* <FileInput value={seminarBackground} onChange={onFileChange} /> */}
          <Controller
            name="file"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <MuiFileInput
                  value={field.value}
                  ref={field.ref}
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
          <div className={`${style.seminarForm__button}`}>
            <CustomizedButton
              type="submit"
              variant="contained"
              color="primary600"
            >
              Xác nhận
            </CustomizedButton>
          </div>
        </form>
      </Grid2>
    </Grid2>
  );
};

export default SeminarForm;
