import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import * as icons from "@mui/icons-material";
import { useTheme } from "@emotion/react";

import {
  Divider,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Typography,
  Box
} from "@mui/material";
import styled from "@emotion/styled";

import NavbarLinks from "../../Data/Sidebar.json";
import {
  selectCurrentClassId,
  selectCurrentRole,
} from "../../Features/Auth/AuthSlice";
import { selectMobView } from "../../Features/ToggleSideBar/ToggleSidebarSlice";

export const SideNavLinks = ({ openWide }) => {
  const role = useSelector(selectCurrentRole);
  const classId = useSelector(selectCurrentClassId);
  const mobScreenView = useSelector(selectMobView);
  const theme = useTheme();

  const location = useLocation();


  const StyledListItemButton = styled(ListItemButton)(({ focused }) => ({
    flexDirection: mobScreenView ? "column" : "row",
    justifyContent: mobScreenView ? "center" : "initial",
    borderRadius: "10px",
    margin: "5px",
    "&:hover": {
      color: "#ffff !important",
      backgroundColor: theme.palette.primary.main,
      borderRadius: "10px",
      margin: "5px",
      // Target nested elements on hover
      "& .MuiListItemIcon-root, & .MuiTypography-root": {
        color: "#ffff",
      },
    },
    ...(focused && {
      color: "#ffff !important",
      backgroundColor: theme.palette.primary.main,
      borderRadius: "10px",
      margin: "5px",
      "& .MuiListItemIcon-root, & .MuiTypography-root": {
        color: "#ffff",
      },
    }),
  }));

  // active state is derived from current location.pathname

  const NavLinks = NavbarLinks.filter((user) => user.type === `${role}`);

  // Replace placeholders in URL with actual values
  const replaceUrlPlaceholders = (url, classId, userRoles) => {
    let updatedUrl = url.replace(":classId", classId);
    updatedUrl = updatedUrl.replace(":userRoles", userRoles);
    return updatedUrl;
  };

  return (
    <>
      <Box sx={{ mt: '20px' }}>
        {NavLinks.map((data) =>
          data.content.map((item) => (
            <div key={item.division}>
              <List
                sx={{ paddingTop: '0px', paddingBottom: '0px' }}
                key={item.division}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                {item.section.map((navLinks) => {
                  const Icon = icons[navLinks.icon];
                  const to = replaceUrlPlaceholders(navLinks.to, classId, role);
                  const normalizedTo = to.startsWith("/") ? to : `/${to}`;
                  const isFocused =
                    location.pathname === normalizedTo ||
                    location.pathname.startsWith(normalizedTo + "/");
                  return (
                    <StyledListItemButton
                      key={navLinks.title}
                      variant="sidenav"
                      component={Link}
                      focused={isFocused}
                      to={to}
                    >
                      <ListItemIcon
                        sx={{
                          justifyContent: "center",
                          color: "#a0a5b9",

                          "&:hover": {
                            color: "#ffff !important",
                          },
                          ...(isFocused && {
                            color: "#ffff !important",
                          }),
                        }}
                      >
                        <Icon sx={{ fontSize: "1.3rem" }}>{navLinks.icon}</Icon>

                      </ListItemIcon>
                      {openWide && (
                        <Typography
                          sx={{
                            fontSize: "14px !important",
                            fontWeight: "100",
                            lineHeight: "10px",
                            color: "#a0a5b9",
                            mb: "2px",
                            "&:hover": {
                              color: "#ffff !important",
                            },
                            ...(isFocused && {
                              color: "#ffff !important",
                            }),
                          }}
                        >
                          {navLinks.title}
                        </Typography>
                      )}
                    </StyledListItemButton>
                  );
                })}
              </List>
            </div>
          ))
        )}
        <Divider variant="middle" />
      </Box>
    </>
  );
};
