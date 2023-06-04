/*
  Component: Breadcrumbs
  Purpose: To display the breadcrumbs on pages
  Component's props:
    - navigate: array of object that express the title and link for an item in breadcrumbs
      + format: [{title, route}]
*/

import React from "react";
import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import style from "./GlobalBreadcrumbs.module.scss";

const GlobalBreadcrumbs = (props) => {
  return (
    <div>
      <Breadcrumbs sx={{ margin: ".5rem 0" }}>
        {props.navigate.map((item, index) => {
          if (item.route) {
            return (
              <Link
                className={`${style.breadcrumbs__link}`}
                key={`breadcrumbs${index}`}
                to={item.route}
              >
                {item.title}
              </Link>
            );
          } else {
            return (
              <Typography
                key={`breadcrumbs${index}`}
                className={`${style.breadcrumbs__title}`}
              >
                {item.title}
              </Typography>
            );
          }
        })}
      </Breadcrumbs>
    </div>
  );
};

export default GlobalBreadcrumbs;
