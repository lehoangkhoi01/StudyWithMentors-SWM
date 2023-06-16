export default [
  {
    id: 14,
    title: "Booked Schedule - Sharing topic",
    start: new Date(new Date().setHours(new Date().getHours() + 24)),
    end: new Date(new Date().setHours(new Date().getHours() + 26)),
  },
  {
    id: 15,
    title: "Free schedule",
    start: new Date(),
    end: new Date(new Date().setHours(new Date().getHours() + 1)),
  },
];
