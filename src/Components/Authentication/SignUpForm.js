import { Button, TextField } from "@mui/material";
import style from "./SignUpForm.module.scss";
import { useForm } from "react-hook-form";
import { useState } from "react";

const STAGE = {
  signUP: "Sign up",
  sentEmail: "Sent email",
};

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const [stage, setStage] = useState(STAGE.signUP);
  const [signUpForm, setSignUpForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [tempEmail, setTempEmail] = useState("");

  const onSubmit = (data) => {
    console.log(data);
    setSignUpForm(data);
    setStage(STAGE.sentEmail);
  };

  const changeTempEmailHandler = (event) => {
    setTempEmail(event.target.value);
  };

  const updateEmail = () => {
    setSignUpForm((prevValue) => ({ ...prevValue, email: tempEmail }));
  };
  console.log(signUpForm);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${style.signUp__container}`}
    >
      <h1>Growth Me</h1>
      <h2>Đăng ký</h2>
      {stage === STAGE.signUP && (
        <>
          <TextField id="email" label="Email" {...register("email")} />
          <TextField
            id="fullname"
            label="Họ và tên"
            {...register("fullName")}
          />
          <TextField id="password" label="Mật khẩu" {...register("password")} />
          <TextField
            id="confirmPassword"
            label="Nhập lại mật khẩu"
            {...register("confirmPassword")}
          />
          <Button
            type="submit"
            className={`${style.signUp__button}`}
            variant="contained"
          >
            Đăng ký
          </Button>

          <Button className={`${style.signUp__button}`} variant="outlined">
            Đăng ký bằng Gmail
          </Button>
          <p>
            Bạn đã có tài khoản? <a href={"#"}>Đăng nhập ngay!</a>
          </p>
        </>
      )}
      {stage === STAGE.sentEmail && (
        <>
          <p>Email xác nhận tài khoản đã được gửi đến bạn.</p>
          <p>
            Vui lòng kiểm tra và kích hoạt tài khoản bằng cách nhấp vào liên kết
            Growth Me đã gửi đến địa chỉ email {signUpForm.email}
          </p>
          <div>
            <p>Chưa nhận được email?</p>
            <Button className={`${style.signUp__button}`} variant="outlined">
              Đăng ký bằng Gmail
            </Button>
          </div>
          <p>
            Trường hợp email chưa chính xác, vui lòng cập nhật lại email bên
            duối và bấm &quot;Cập nhật&quot; để được gửi lại.
          </p>

          <TextField
            id="email"
            label="Email"
            value={tempEmail}
            onChange={changeTempEmailHandler}
          />

          <Button
            className={`${style.signUp__button}`}
            variant="contained"
            onClick={updateEmail}
          >
            Cập nhật
          </Button>
        </>
      )}
    </form>
  );
};

export default SignUp;
