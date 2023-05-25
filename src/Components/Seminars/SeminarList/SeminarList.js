import { useEffect, useState } from "react";
import SeminarCard from "../SeminarCard/SeminarCard";
import { seminarService } from "../../../Services/seminarService";

const DUMMY_DATA = [
  {
    title: "Start up 001: How to market research",
    author: "Paul Kim",
    time: "9h00 - 16/05/2023",
    location: "Semniar room",
    organizer: "Phòng quan hệ doanh nghiệp",
    status: "Sắp diễn ra",
  },
  {
    title: "Lập trình Java web từ 0 đến 100",
    author: "Paul Kim",
    time: "9h00 - 16/05/2023",
    location: "Semniar room",
    organizer: "Phòng quan hệ doanh nghiệp",
    status: "Sắp diễn ra",
  },
  {
    title: "Start up 001: How to market research",
    author: "Paul Kim",
    time: "9h00 - 16/05/2023",
    location: "Semniar room",
    organizer: "Phòng quan hệ doanh nghiệp",
    status: "Sắp diễn ra",
  },
  {
    title: "Lập trình Java web từ 0 đến 100",
    author: "Paul Kim",
    time: "9h00 - 16/05/2023",
    location: "Semniar room",
    organizer: "Phòng quan hệ doanh nghiệp",
    status: "Sắp diễn ra",
  },
];

const SeminarList = () => {
  const [seminars, setSeminars] = useState([]);

  useEffect(() => {
    const getSeminarList = async () => {
      try {
        const response = await seminarService.getSemniars();

        setSeminars(response);

        console.log(seminars);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    getSeminarList();
  }, []);

  return (
    <div>
      {DUMMY_DATA.map((data, index) => (
        <SeminarCard key={`SEMINAR_CARD_${index}`} data={data} />
      ))}
    </div>
  );
};

export default SeminarList;
