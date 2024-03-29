import { Button, FormControl, Grid, InputLabel } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import style from "./SeminarFilter.module.scss";
import { styled } from "@mui/material/styles";
import CustomizedTextField from "../../../../shared/components/TextField/CustomizedTextField";
import CustomizedSelect from "../../../../shared/components/Select/CustomizedSelect";
import {
  BUTTON_LABEL,
  DATE_FORMAT,
  ERROR_MESSAGES,
  PLACE_HOLDER,
} from "../../../../shared/constants/common";
import { useForm } from "react-hook-form";
import CustomizedDateRangePicker from "../../../../shared/components/DateRangePicker/CustomizedDateRangePicker";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { departmentService } from "../../../../Services/departmentService";
import { convertISOToFormat } from "../../../../Helpers/dateHelper";
import { useNotification } from "../../../../Helpers/generalHelper";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const StyledLabelSelect = styled(InputLabel)`
  &.Mui-focused {
    color: #1a237e;
  }
`;

const SeminarFilter = forwardRef((props, ref) => {
  const { register, getValues, reset } = useForm();
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]);

  const { setNotification } = useNotification();

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const response = await departmentService.getDepartments();
        setDepartments(response);
      } catch (error) {
        setNotification({
          isOpen: true,
          type: "error",
          message: ERROR_MESSAGES.COMMON_ERROR,
        });
      }
    };

    getDepartments();
  }, []);

  const onFilter = (_, getAll) => {
    const seminarName = getValues("seminarName");
    const [startDateJs, endDateJs] = selectedDateRange;
    const startDate = startDateJs ? startDateJs.toDate() : "";
    const endDate = endDateJs ? endDateJs.toDate() : "";

    if (getAll) {
      props.onSeminarFilter();
    } else {
      props.onSeminarFilter(
        seminarName,
        convertISOToFormat(DATE_FORMAT.BACK_END_YYYY_MM_DD, startDate) ?? null,
        convertISOToFormat(DATE_FORMAT.BACK_END_YYYY_MM_DD, endDate) ?? null,
        selectedDepartment.id
      );
    }
  };

  const handleDepartmentChange = (event) => {
    const {
      target: { value },
    } = event;

    setSelectedDepartment(value);
  };

  const clearFilter = () => {
    setSelectedDepartment([]);
    setSelectedDateRange([null, null]);
    reset({
      seminarName: "",
    });
    props.setFilterInfo();
  };

  useImperativeHandle(ref, () => ({
    resetSelectedDepartment() {
      setSelectedDepartment([]);
    },
  }));

  return (
    <div className={`${style.filterSection__container}`}>
      <Grid
        className={`${style.filterSection__gridContainer}`}
        container
        columnSpacing={{ sm: 2 }}
      >
        <Grid item xs={12} sm={4} lg={3.5}>
          <CustomizedTextField
            fullWidth
            placeholder={PLACE_HOLDER.SEARCH_MENTOR}
            required={true}
            options={{
              ...register("seminarName"),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <FormControl fullWidth>
            <StyledLabelSelect className={`${style.filterSection__label}`}>
              {PLACE_HOLDER.DEFAULT_DEPARTMENT}
            </StyledLabelSelect>
            <CustomizedSelect
              fullWidth
              items={departments}
              value={selectedDepartment}
              onChange={handleDepartmentChange}
              placeholder={PLACE_HOLDER.DEFAULT_DEPARTMENT}
              renderValue={(selected) => selected.name}
              MenuProps={MenuProps}
              required={true}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <FormControl fullWidth>
            <CustomizedDateRangePicker
              value={selectedDateRange}
              setValue={setSelectedDateRange}
            />
          </FormControl>
        </Grid>
        <Grid
          marginTop={{ xs: 1, sm: 0 }}
          item
          xs={12}
          sm={3}
          md={2.5}
          lg={1.5}
        >
          <FormControl fullWidth>
            <Button
              className={`${style.filterSection__button}`}
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={onFilter}
            >
              {BUTTON_LABEL.SEARCH}
            </Button>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3} md={2} lg={1}>
          <FormControl fullWidth>
            <Button
              variant="text"
              className={`${style.filterSection__linkButton}`}
              onClick={clearFilter}
            >
              {BUTTON_LABEL.DEFAULT}
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
});

SeminarFilter.displayName = "SeminarFilter";

export default SeminarFilter;
