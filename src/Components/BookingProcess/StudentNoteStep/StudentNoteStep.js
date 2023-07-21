import React from "react";
import CustomizedTextField from "../../../shared/components/TextField/CustomizedTextField";
import { useCustomLoading } from "../../../Helpers/generalHelper";
import { userAccountService } from "../../../Services/userAccountService";
import { Controller, useForm } from "react-hook-form";
import AutocompleteInput from "../../../shared/components/AutocompleteInput/AutocompleteInput";
import { Typography, Checkbox } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import style from "./StudentNote.Step.module.scss";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../Store/slices/userSlice";
import { ROUTES } from "../../../shared/constants/navigation";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const StudentNoteStep = (props) => {
  const { setLoading } = useCustomLoading();
  const history = useHistory();

  const [studentList, setStudentList] = React.useState([]);

  const {
    control,
    formState: { errors },
  } = useForm();
  const userInfo = useSelector(selectUserInfo);

  const getOptionLabel = (option) => {
    return option?.fullName;
  };

  const renderOptionSpeakerAutocomplete = (props, option, { selected }) => {
    return (
      <li {...props} className={`${style.autocomplete__rowDropdown}`}>
        <Checkbox
          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
          checkedIcon={<CheckBoxIcon fontSize="small" />}
          style={{ marginRight: 8 }}
          checked={selected}
        />
        <div className={`${style.autocomplete__rowDropdown__userInfo}`}>
          <Typography textAlign="left">{option.fullName}</Typography>
          <Typography variant="caption">{option.email}</Typography>
        </div>
      </li>
    );
  };

  const extractValue = (option) => (option ? option.id : "");

  React.useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const result = await userAccountService.getAllStudents();
        const newResult = result.filter(
          (acc) => acc.accountId !== userInfo.accountId
        );
        setStudentList(newResult);
      } catch (error) {
        history.push(ROUTES.SERVER_ERROR);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <CustomizedTextField
        multiline
        maxRows={3}
        optional={true}
        name="Lưu ý, chú thích cho mentor"
        onChange={props.onTextFieldChange}
        value={props.value}
      />
      <Controller
        control={control}
        name="participants"
        defaultValue={[]}
        render={({ field }) => (
          <AutocompleteInput
            multiple={true}
            disabled={false}
            label="Mời bạn bè tham gia"
            required={false}
            id="autocomplete-students"
            options={studentList}
            getOptionLabel={getOptionLabel}
            renderOption={renderOptionSpeakerAutocomplete}
            error={errors.seminarSpeakers}
            extractValue={extractValue}
            selectedValues={props.selectedStudents}
            setSelectedValues={props.setSelectedStudents}
            field={field}
          />
        )}
      />
    </div>
  );
};

export default StudentNoteStep;
