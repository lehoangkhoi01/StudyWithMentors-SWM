import * as React from "react";
import { Typography, ListItemButton, List, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import style from "./TopicList.module.scss";

const ListItem = styled(ListItemButton)`
  border: 1px solid #c5cae9;
  margin: 0.5rem;
  border-radius: 10px;
  padding: 1rem;
  transition: ease-in 300ms;
  &.Mui-selected {
    background-color: #e8eaf6;
    border: 3px solid #9fa8da;
  }
`;

const TopicList = (props) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, topic) => {
    props.setSelectedTopic(topic);
    setSelectedIndex(topic.id);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <List component="nav" aria-label="secondary mailbox folder">
        {props.topics?.map((topic) => (
          <ListItem
            key={topic.id}
            selected={selectedIndex === topic.id}
            onClick={(event) => handleListItemClick(event, topic)}
          >
            <div>
              <Typography
                className={`${style.booking__topicList__title}`}
                variant="h6"
              >
                {topic.title}
              </Typography>
              <div>
                <span className={style.booking__topicList__detail}>
                  Nhóm: {topic.field}
                </span>{" "}
                |{" "}
                <span className={style.booking__topicList__detail}>
                  Lĩnh vực: {topic.category}
                </span>
              </div>
            </div>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TopicList;