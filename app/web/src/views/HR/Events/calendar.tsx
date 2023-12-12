import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";

const CalendarApp = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userEvents = await fetchAllUserEvents();
        setEvents(userEvents);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const fetchAllUserEvents = async () => {
    setLoading(true);
    const userEventsURL = `${"EventBaseURL"}/events/allevents?userEmail=${"UserEmail"}`;

    try {
      const response = await fetch(userEventsURL);
      if (response.ok) {
        const data = await response.json();
        return data.AllEvents;
      }
      return [];
    } catch (error) {
      console.error(error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <img src="./Images/Icons/MyCalBrand.png" alt="logo" />
          <div id="linav">
            <ul>
              <li>
                <a href="./Dashboard.html">Home</a>
              </li>
              <li>
                <a href="./Dashboard.html">Availability</a>
              </li>
              <li>
                <a href="./Dashboard.html">Integrations</a>
              </li>
            </ul>
          </div>
          <div id="Logout">
            <div className="namecircle">
              <img
                style={{ width: "22px", filter: "invert()" }}
                src="Images/logout.svg"
                alt=""
              />
            </div>
            <a href="Dashboard.html" id="UserShow3">
              Account
            </a>
          </div>
        </Toolbar>
      </AppBar>

      <Container>
        <main>
          <section id="Home">
            <div className="CalendarHold">
              <div id="calendar"></div>
            </div>
          </section>
          <section>
            <center>
              {loading ? (
                <Typography variant="h1">Loading...</Typography>
              ) : (
                <Typography variant="h1">
                  Mark your events on your calendar.
                </Typography>
              )}
            </center>
          </section>
        </main>
      </Container>

      <footer>
        {/* Include Material-UI components for the footer as needed */}
      </footer>
    </>
  );
};

export default CalendarApp;
