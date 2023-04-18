import React from "react";
import { Button, FormControl, Grid, InputLabel } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import style from "./FilterSection.module.scss";
import CustomizedTextField from "../../../shared/components/TextField/CustomizedTextField";
import CustomizedSelect from "../../../shared/components/Select/CustomizedSelect";
import { BUTTON_LABEL } from "../../../shared/constants/common";

const names = [
  "IT - Phần mêm",
  "IT - Phần cứng",
  "Bất động sản",
  "Thiết kế/Kiến trúc",
  "Nhà hàng/Khách sạn",
  "Marketing",
  "Đầu tư chứng khoán",
  "Ngoại ngữ",
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

const FilterSection = () => {
  const [personName, setPersonName] = React.useState([]);
  const handleChange = (event) => {
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
            placeholder="Tên kỹ năng, công ty mà bạn quan tâm"
            required={true}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Tất cả lĩnh vực</InputLabel>
            <CustomizedSelect
              fullWidth
              items={names}
              inputId="majorSelect"
              isMultipleSelect={true}
              value={personName}
              onChange={handleChange}
              placeholder="Tất cả lĩnh vực"
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
              Mặc định
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

export default FilterSection;
