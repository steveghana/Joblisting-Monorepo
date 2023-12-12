import React from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Paper,
  Button,
  Divider,
  Grid,
  Avatar,
} from "@mui/material";

const EventDashboard: React.FC = () => {
  return (
    <>
      <AppBar
        position="sticky"
        style={{ backgroundColor: "white", boxShadow: "none" }}
      >
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <a href="index.html">
            <img
              src="Images/Icons/MyCalBrand.png"
              alt="logo"
              style={{ width: "50%" }}
            />
          </a>
          <div id="linav" style={{ marginLeft: "auto" }}>
            <ul style={{ display: "flex", listStyleType: "none" }}>
              <li>
                <a
                  href="./index.html"
                  style={{ textDecoration: "none", color: "gray" }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="./Dashboard.html"
                  style={{ textDecoration: "none", color: "gray" }}
                >
                  Availability
                </a>
              </li>
              <li>
                <a
                  href="./Dashboard.html"
                  style={{ textDecoration: "none", color: "gray" }}
                >
                  Integrations
                </a>
              </li>
            </ul>
          </div>
          <div id="Logout" style={{ display: "flex", alignItems: "center" }}>
            <div
              className="namecircle"
              style={{
                fontSize: 0,
                padding: "10px",
                marginRight: "0.5rem",
                borderRadius: "50%",
                backgroundColor: "#8d8d8d",
                border: "3px solid #8d8b8b",
              }}
            >
              <img
                style={{ width: "22px", filter: "invert()" }}
                src="Images/logout.svg"
                alt=""
              />
            </div>
            <a
              href="Dashboard.html"
              id="UserShow3"
              style={{ fontSize: "14px" }}
            >
              Account
            </a>
          </div>
        </Toolbar>
      </AppBar>

      <Divider className="colorHR" orientation="vertical" flexItem />

      <Container style={{ width: "80%", margin: "auto" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <Avatar
              id="Avatarimg"
              src="Images/avatar2.png"
              alt=""
              style={{ margin: "15px", width: "90px", borderRadius: "50%" }}
            />
            <div>
              <Typography
                id="UserShow"
                variant="body1"
                style={{ marginBottom: "0.3rem", fontSize: "23px" }}
              >
                Mohima Bahadur
              </Typography>
              <Typography>
                MyCal.com/
                <span id="UserShow2" style={{ fontSize: "14px" }}>
                  mohimabahadur
                </span>
              </Typography>
            </div>
          </div>
        </div>

        <Divider style={{ width: "100%", margin: "2% 0" }} />

        <Paper style={{ padding: "2%", width: "100%", marginTop: "2%" }}>
          <Typography
            variant="h5"
            style={{ fontSize: "1.2rem", padding: "1.5% 0" }}
          >
            You don't have any event types yet.
          </Typography>
          <Typography style={{ fontSize: "1rem" }}>
            You'll want to add an event type to allow people to schedule with
            you.
          </Typography>
        </Paper>
      </Container>
    </>
  );
};

export default EventDashboard;
