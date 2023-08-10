import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomizedTextField from "../../shared/components/TextField/CustomizedTextField";
import CustomizedButton from "../../shared/components/Button/CustomizedButton";
import {
  useCustomAppbar,
  useCustomLoading,
  useNotification,
  useSystemConfig,
} from "../../Helpers/generalHelper";
import { ERROR_MESSAGES, TEXTFIELD_LABEL } from "../../shared/constants/common";
import { systemConfigService } from "../../Services/systemConfigService";
import style from "./ConfigForm.module.scss";
import { APPBAR_TITLES } from "../../shared/constants/appbarTitles";
import { commonSystemConfigValidation } from "../../shared/constants/validationRules";
import { useSelector } from "react-redux";
import { selectSystemConfig } from "../../Store/slices/helperSlice";

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
  const { getSystemConfig, getLatestSystemConfig } = useSystemConfig();
  const systemConfig = useSelector(selectSystemConfig);
  setAppbar(APPBAR_TITLES.SYSTEM_CONFIG);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await systemConfigService.updateConfig(data);
      await getLatestSystemConfig();
      setNotification({
        isOpen: true,
        type: "success",
        message: "Cập nhật cài đặt hệ thống thành công",
      });
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

  const fetchConfigData = async () => {
    try {
      setLoading(true);
      const result = await getSystemConfig();
      setValue("maxRequestedBooking", result.maxRequestedBooking);
      setValue("maxParticipant", result.maxParticipant);
      setValue("autoRejectBookingDelay", result.autoRejectBookingDelay);
      setValue("invitationEmailDelay", result.invitationEmailDelay);
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
  }, [systemConfig]);

  return (
    <div className={`${style.systemConfig__container}`}>
      <form
        className={`${style.systemConfig__form}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <CustomizedTextField
          inputId="maxParticipant"
          name={TEXTFIELD_LABEL.MAX_PARTICIPANT}
          required={true}
          options={{
            ...register("maxParticipant", commonSystemConfigValidation),
          }}
          error={errors.maxParticipant ? true : false}
          helperText={errors?.maxParticipant?.message}
        />
        <CustomizedTextField
          inputId="maxRequestedBooking"
          name={TEXTFIELD_LABEL.MAX_REQUEST_BOOKING}
          required={true}
          options={{
            ...register("maxRequestedBooking", commonSystemConfigValidation),
          }}
          error={errors.maxRequestedBooking ? true : false}
          helperText={errors?.maxRequestedBooking?.message}
        />
        <CustomizedTextField
          inputId="invitationEmailDelay"
          name={TEXTFIELD_LABEL.INVITATION_EMAIL_DELAY}
          required={true}
          options={{
            ...register("invitationEmailDelay", commonSystemConfigValidation),
          }}
          error={errors.invitationEmailDelay ? true : false}
          helperText={errors?.invitationEmailDelay?.message}
        />
        <CustomizedTextField
          inputId="autoRejectBookingDelay"
          name={TEXTFIELD_LABEL.AUTO_REJECT_BOOKING_DELAY}
          required={true}
          options={{
            ...register("autoRejectBookingDelay", commonSystemConfigValidation),
          }}
          error={errors.autoRejectBookingDelay ? true : false}
          helperText={errors?.autoRejectBookingDelay?.message}
        />
        <div className={`${style.systemConfig__button}`}>
          <CustomizedButton
            type="submit"
            variant="contained"
            color="primary600"
          >
            Cập nhật
          </CustomizedButton>
        </div>
      </form>
    </div>
  );
};

export default ConfigForm;
