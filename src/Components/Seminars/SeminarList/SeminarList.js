import style from "./SeminarList.module.scss";
import { useEffect, useState } from "react";
import SeminarCard from "../SeminarCard/SeminarCard";
import { seminarService } from "../../../Services/seminarService";
import { Grid } from "@mui/material";
import SeminarFilter from "./SeminarFilter/SeminarFilter";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";
import { BUTTON_LABEL, FILTER_SEMINAR } from "../../../shared/constants/common";

const SeminarList = () => {
  const [seminars, setSeminars] = useState([]);
  const [statusFilter, setStatusFilter] = useState(FILTER_SEMINAR.ALL);
  const [majorName, setMajorName] = useState([]);
  const [categoryName, setCategoryName] = useState([]);

  const handleMajorChange = (event) => {
    const {
      target: { value },
    } = event;
    setMajorName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategoryName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    const getSeminarList = async () => {
      try {
        const response = await seminarService.getSemniars();

        setSeminars(response);
      } catch (error) {
        console.log(error);
      }
    };

    getSeminarList();
  }, []);

  const onChangeStatusFilter = (status) => {
    setStatusFilter(status);
  };

  return (
    <div>
      <SeminarFilter
        majorName={majorName}
        categoryName={categoryName}
        handleMajoreChange={handleMajorChange}
        handleCategoryChange={handleCategoryChange}
      />
      <div className={style.status__filter}>
        <div className={style.status__filter__items}>
          <p
            className={
              statusFilter === FILTER_SEMINAR.ALL &&
              style.status__filter__active
            }
            onClick={() => {
              onChangeStatusFilter(FILTER_SEMINAR.ALL);
            }}
          >
            {FILTER_SEMINAR.ALL}
          </p>
          <p
            className={
              statusFilter === FILTER_SEMINAR.IS_COMMING &&
              style.status__filter__active
            }
            onClick={() => {
              onChangeStatusFilter(FILTER_SEMINAR.IS_COMMING);
            }}
          >
            {FILTER_SEMINAR.IS_COMMING}
          </p>
          <p
            className={
              statusFilter === FILTER_SEMINAR.PAST &&
              style.status__filter__active
            }
            onClick={() => {
              onChangeStatusFilter(FILTER_SEMINAR.PAST);
            }}
          >
            {FILTER_SEMINAR.PAST}
          </p>
        </div>

        <CustomizedButton variant="outlined" color="primary600">
          <img
            className={style.add_icon}
            src={require("../../../assets/icons/Add_Seminar.png")}
          />{" "}
          {BUTTON_LABEL.CREATE_SEMINAR}
        </CustomizedButton>
      </div>
      <Grid className={style.list} container spacing={2} alignItems={"stretch"}>
        {seminars.map((data, index) => (
          <Grid key={`SEMINAR_CARD_${index}`} item xs={12} md={6} lg={3}>
            <SeminarCard data={data} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SeminarList;
