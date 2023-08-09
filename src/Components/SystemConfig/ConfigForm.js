import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomizedTextField from "../../shared/components/TextField/CustomizedTextField";
import CustomizedButton from "../../shared/components/Button/CustomizedButton";
import {
  useCustomAppbar,
  useCustomLoading,
  useNotification,
} from "../../Helpers/generalHelper";
import { ERROR_MESSAGES } from "../../shared/constants/common";
import { systemConfigService } from "../../Services/systemConfigService";
import style from "./ConfigForm.module.scss";
import { APPBAR_TITLES } from "../../shared/constants/appbarTitles";
import { getSystemConfigFieldValidation } from "../../Helpers/validationHelper";

const ConfigForm = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();
  const { setLoading } = useCustomLoading();
  const { setNotification } = useNotification();
  const { setAppbar } = useCustomAppbar();
  setAppbar(APPBAR_TITLES.SYSTEM_CONFIG);

  const onSubmit = (data) => {
    console.log(data);
  };

  const fetchConfigData = async () => {
    try {
      const result = await systemConfigService.getConfigs();
      console.log(result);
      setValue(
        "maxRequestedBooking",
        result[result.length - 1].maxRequestedBooking
      );
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfigData();
  }, []);

  return (
    <div className={`${style.systemConfig__container}`}>
      <form
        className={`${style.systemConfig__form}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <CustomizedTextField
          inputId="maxRequestedBooking"
          name={"Max request booking"}
          required={true}
          options={{
            ...register(
              "maxRequestedBooking",
              getSystemConfigFieldValidation("maxRequestedBooking")
            ),
          }}
          error={errors.maxRequestedBooking ? true : false}
          helperText={errors?.maxRequestedBooking?.message}
        />
        <CustomizedButton type="submit" variant="contained" color="primary600">
          Cập nhật
        </CustomizedButton>
      </form>
    </div>
  );
};

export default ConfigForm;
