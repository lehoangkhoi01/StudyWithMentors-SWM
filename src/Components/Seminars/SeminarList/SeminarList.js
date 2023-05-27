import { useEffect, useState } from "react";
import SeminarCard from "../SeminarCard/SeminarCard";
import { seminarService } from "../../../Services/seminarService";
import { Grid } from "@mui/material";

const SeminarList = () => {
  1;
  const [seminars, setSeminars] = useState([]);

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

  return (
    <div>
      <Grid container spacing={2} alignItems={"stretch"}>
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
