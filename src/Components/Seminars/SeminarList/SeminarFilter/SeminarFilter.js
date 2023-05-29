import { Button, FormControl, Grid, InputLabel } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import style from "./SeminarFilter.module.scss";
import { styled } from "@mui/material/styles";
import CustomizedTextField from "../../../../shared/components/TextField/CustomizedTextField";
import CustomizedSelect from "../../../../shared/components/Select/CustomizedSelect";
import {
  BUTTON_LABEL,
  PLACE_HOLDER,
} from "../../../../shared/constants/common";

const MAJOR_NAMES = [
  { name: "IT - Phần mêm", value: "IT - Phần mêm" },
  { name: "IT - Phần cứng", value: "IT - Phần cứng" },
  { name: "Bất động sản", value: "Bất động sản" },
  { name: "Thiết kế/Kiến trúc", value: "Thiết kế/Kiến trúc" },
  { name: "Nhà hàng/Khách sạn", value: "Nhà hàng/Khách sạn" },
  { name: "Marketing", value: "Marketing" },
];

const CATEGORY_NAMES = [
  { name: "Kỹ năng mềm", value: "Kỹ năng mềm" },
  { name: "Kiến thức chuyên môn", value: "Kiến thức chuyên môn" },
  { name: "Nghề nghiệp", value: "Nghề nghiệp" },
  { name: "Feedback và Lời khuyên", value: "eedback và Lời khuyên" },
  { name: "Học bổng", value: "Học bổng" },
  { name: "Các cuộc thi", value: "Các cuộc thi" },
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

const SeminarFilter = (props) => {
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
            inputId="search"
            placeholder={PLACE_HOLDER.SEARCH_MENTOR}
            required={true}
          />
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <FormControl fullWidth>
            <StyledLabelSelect className={`${style.filterSection__label}`}>
              {PLACE_HOLDER.ALL_MAJOR}
            </StyledLabelSelect>
            <CustomizedSelect
              fullWidth
              items={MAJOR_NAMES}
              inputId="majorSelect"
              imdultipleSelect={true}
              value={props.majorName}
              onChange={props.handleMajoreChange}
              placeholder={PLACE_HOLDER.DEFAULT_FILTER_MENTOR_SELECT}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
              required={true}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <FormControl fullWidth>
            <StyledLabelSelect className={`${style.filterSection__label}`}>
              {PLACE_HOLDER.ALL_CATEGORY}
            </StyledLabelSelect>
            <CustomizedSelect
              fullWidth
              items={CATEGORY_NAMES}
              inputId="majorSelect"
              imdultipleSelect={true}
              value={props.categoryName}
              onChange={props.handleCategoryChange}
              placeholder={PLACE_HOLDER.DEFAULT_FILTER_MENTOR_SELECT}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
              required={true}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3} md={2.5} lg={1.5}>
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
        <Grid item xs={12} sm={3} md={2} lg={1}>
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
      <Grid container spacing={3}></Grid>
    </div>
  );
};

export default SeminarFilter;
