import { useForm } from "react-hook-form";
import style from "./Profile.module.scss"
import { BUTTON_LABEL, COMMON_MESSAGE, ERROR_MESSAGES, PLACE_HOLDER, PROFILE, TITLE } from "../../shared/constants/common";
import CustomizedTextField from "../../shared/components/TextField/CustomizedTextField";
import { registerFullNameValidation } from "../../shared/constants/validationRules";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, userAction } from "../../Store/slices/userSlice";
import { useEffect } from "react";
import CustomizedButton from "../../shared/components/Button/CustomizedButton";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useCustomLoading, useNotification } from "../../Helpers/generalHelper";
import { userAccountService } from "../../Services/userAccountService";
import { ROUTES } from "../../shared/constants/navigation";

const Profile = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    const userInfo = useSelector(selectUserInfo);

    const history = useHistory();
    const dispatch = useDispatch();

    const { setLoading } = useCustomLoading();
    const { setNotification } = useNotification();


    useEffect(() => {
        setValue("fullName", userInfo.fullName);
        setValue("phone", userInfo.phone);
        setValue("email", userInfo.email);
    }, []);

    const validatePhoneNum = (phoneNum) => {
        if (phoneNum && (phoneNum.length < 10 || phoneNum.length > 11)) {
            return ERROR_MESSAGES.INVALID_PHONE_NUM;
        } else if (phoneNum && /^\d+$/.test(phoneNum) === false) {
            return ERROR_MESSAGES.INVALID_PHONE_NUM;
        }
    };

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            const updatedUserInfo = { ...userInfo, ...data, activateAccount: true };

            const newProfile = await userAccountService.confirmUserProfile(
                updatedUserInfo
            );

            dispatch(userAction.setUserInfo(newProfile));

            setNotification({
                isOpen: true,
                type: "success",
                message: COMMON_MESSAGE.UPDATE_PROFILE_SUCCESS,
            });
        } catch (error) {
            setNotification({
                isOpen: true,
                type: "error",
                message: COMMON_MESSAGE.UPDATE_PROFILE_FAIL,
            });
        } finally {
            setLoading(false);
            history.push(ROUTES.HOME);
        }
    };

    return <div className={style.profile__container}>
        <form
            className={style.profile__formSection}
            onSubmit={handleSubmit(onSubmit)}
        >
            <h1>{PROFILE.UPDATE_PROFILE} </h1>
            <CustomizedTextField
                className={style.profile__input}
                inputId="email"
                name={TITLE.EMAIL}
                placeholder={PLACE_HOLDER.DEFAULT_EMAIL}
                required={true}
                type={"email"}
                options={{ ...register("email") }}
                disabled={true}
            />
            <CustomizedTextField
                className={style.profile__input}
                inputId="fullname"
                name={TITLE.FULL_NAME}
                placeholder={PLACE_HOLDER.DEFAULT_NAME}
                required={true}
                type={"text"}
                options={{ ...register("fullName", registerFullNameValidation) }}
                error={errors.fullname ? true : false}
                helperText={errors?.fullname?.message}
            />
            <CustomizedTextField
                className={style.profile__input}
                inputId="phone"
                name={TITLE.PHONE}
                type={"text"}
                options={{
                    ...register("phone", {
                        validate: (val) => validatePhoneNum(val),
                    }),
                }}
                error={errors.phone ? true : false}
                helperText={errors?.phone?.message}
            />
            <div className={style.profile__button}>
                <CustomizedButton
                    type="submit"
                    variant="contained"
                    color="primary600"
                >
                    {BUTTON_LABEL.CONFIRM}
                </CustomizedButton>
            </div>
        </form>
    </div>
}

export default Profile;