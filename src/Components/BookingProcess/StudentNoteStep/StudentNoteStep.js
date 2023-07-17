import React from "react";
import CustomizedTextField from "../../../shared/components/TextField/CustomizedTextField";

const StudentNoteStep = (props) => {
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
    </div>
  );
};

export default StudentNoteStep;
