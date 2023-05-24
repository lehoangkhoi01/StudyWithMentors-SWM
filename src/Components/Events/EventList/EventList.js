import EventCard from "../EventCard/EventCard";

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

const EventList = () => {
  return (
    <div>
      {DUMMY_DATA.map((data, index) => (
         <EventCard key={`EVENT_CARD_${index}`} data={data} />
      ))}
    </div>
  );
};

export default EventList;
