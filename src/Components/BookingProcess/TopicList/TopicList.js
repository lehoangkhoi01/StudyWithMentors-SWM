import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

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
          <ListItemButton
            key={topic.id}
            selected={selectedIndex === topic.id}
            onClick={(event) => handleListItemClick(event, topic)}
          >
            <ListItemText primary={topic.title} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default TopicList;
