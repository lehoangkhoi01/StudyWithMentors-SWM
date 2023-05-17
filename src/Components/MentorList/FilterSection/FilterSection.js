import React from "react";
import { Button, FormControl, Grid, InputLabel } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import style from "./FilterSection.module.scss";
import { styled } from "@mui/material/styles";
import CustomizedTextField from "../../../shared/components/TextField/CustomizedTextField";
import CustomizedSelect from "../../../shared/components/Select/CustomizedSelect";
import { BUTTON_LABEL, PLACE_HOLDER } from "../../../shared/constants/common";

const names = [
  { name: "IT - Phần mêm", value: "IT - Phần mêm" },
  { name: "IT - Phần cứng", value: "IT - Phần cứng" },
  { name: "Bất động sản", value: "Bất động sản" },
  { name: "Thiết kế/Kiến trúc", value: "Thiết kế/Kiến trúc" },
  { name: "Nhà hàng/Khách sạn", value: "Nhà hàng/Khách sạn" },
  { name: "Marketing", value: "Marketing" },
];
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

const FilterSection = () => {
  const [personName, setPersonName] = React.useState([]);
  const handleChange = (event) => {
    console.log(event);
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div className={`${style.filterSection__container}`}>
      <Grid
        className={`${style.filterSection__gridContainer}`}
        container
        spacing={2}
      >
        <Grid item xs={5}>
          <CustomizedTextField
            fullWidth
            inputId="search"
            placeholder={PLACE_HOLDER.SEARCH_MENTOR}
            required={true}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <StyledLabelSelect className={`${style.filterSection__label}`}>
              Tất cả lĩnh vực
            </StyledLabelSelect>
            <CustomizedSelect
              fullWidth
              items={names}
              inputId="majorSelect"
              isMultipleSelect={true}
              value={personName}
              onChange={handleChange}
              placeholder={PLACE_HOLDER.DEFAULT_FILTER_MENTOR_SELECT}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
              required={true}
            />
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <Button
              className={`${style.filterSection__button}`}
              variant="contained"
              startIcon={<SearchIcon />}
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
            >
              {BUTTON_LABEL.DEFAULT}
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

export default FilterSection;
