import { Button, FormControl, Grid, InputLabel } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import style from "./FilterSection.module.scss";
import { styled } from "@mui/material/styles";
import CustomizedTextField from "../../../shared/components/TextField/CustomizedTextField";
import CustomizedSelect from "../../../shared/components/Select/CustomizedSelect";
import {
  BUTTON_LABEL,
  FILTER_SEMINAR,
  PLACE_HOLDER,
} from "../../../shared/constants/common";
import { useState } from "react";
import { useForm } from "react-hook-form";

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

const FilterSection = (props) => {
  const { register, reset, getValues } = useForm();

  const [majorName, setMajorName] = useState([]);

  const handleMajoreChange = (event) => {
    const {
      target: { value },
    } = event;
    setMajorName(typeof value === "string" ? value.split(",") : value);
  };

  const clearFilter = () => {
    setMajorName([]);
    reset({
      searchTerm: "",
    });
    props.onChangeStatusFilter(FILTER_SEMINAR.ALL);
  };

  const onSearch = () => {
    const majorOnlyNames = majorName.map((item) => item.name);
    const searchTerm = getValues("searchTerm");

    const params = [searchTerm, ...majorOnlyNames];

    props.onSearch(params);
  };

  return (
    <div className={`${style.filterSection__container}`}>
      <Grid
        className={`${style.filterSection__gridContainer}`}
        container
        columnSpacing={{ sm: 2 }}
      >
        <Grid item xs={5.5}>
          <CustomizedTextField
            fullWidth
            inputId="search"
            placeholder={PLACE_HOLDER.SEARCH_MENTOR}
            required={true}
            options={{
              ...register("searchTerm"),
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <StyledLabelSelect className={`${style.filterSection__label}`}>
              {PLACE_HOLDER.ALL_MAJOR}
            </StyledLabelSelect>
            <CustomizedSelect
              fullWidth
              items={props.fields}
              inputId="majorSelect"
              isMultipleSelect={true}
              value={majorName}
              onChange={handleMajoreChange}
              placeholder={PLACE_HOLDER.DEFAULT_FILTER_MENTOR_SELECT}
              renderValue={(selected) => {
                return selected.map(
                  (item, index) =>
                    `${item.name}${index < selected.length - 1 ? ", " : ""}`
                );
              }}
              MenuProps={MenuProps}
              required={true}
            />
          </FormControl>
        </Grid>
        <Grid item xs={1.5}>
          <FormControl fullWidth>
            <Button
              className={`${style.filterSection__button}`}
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={onSearch}
            >
              {BUTTON_LABEL.SEARCH}
            </Button>
          </FormControl>
        </Grid>
        <Grid item xs={1}>
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
      <Grid container spacing={3}></Grid>
    </div>
  );
};

export default FilterSection;
