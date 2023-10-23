import React from "react";
import SideBar from "../Component/SideBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./css/dbrd.css";

export default function Dashboard() {
  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <div className="bgi">
          <Typography variant="">
            <>
              <h1>
                <u>ESD (Employee Skill's Devlopment Program) :</u>
              </h1>

              <b>
                <h3 className="our-team-heading">Our Team</h3>
              </b>
              <div className="dashboard-flex-container">
                <div className="dashboard-flex-item">
                  <div className="dashboard-round-image" id="shivam" />
                  <h2 className="dashboard-h2">Shivam Shankar Pandey</h2>
                  <h3 className="dashboard-h3">Front-End Development</h3>
                </div>
                <div className="dashboard-flex-item">
                  <div className="dashboard-round-image" id="zaid"/>
                  <h2 className="dashboard-h2">Mohammad Zaid</h2>
                  <h3 className="dashboard-h3">Front-End Development</h3>
                </div>
                <div className="dashboard-flex-item">
                  <div className="dashboard-round-image"  id="aniket"/>
                  <h2 className="dashboard-h2">Aniket Nigam</h2>
                  <h3 className="dashboard-h3">Back-End Development</h3>
                </div>
                <div className="dashboard-flex-item">
                  <div className="dashboard-round-image" id="rahil" />
                  <h2 className="dashboard-h2">Mohammad Rahil</h2>
                  <h3 className="dashboard-h3">Back-End Development</h3>
                </div>
                <div className="dashboard-flex-item" >
                  <div className="dashboard-round-image" id="prateek"/>
                  <h2 className="dashboard-h2">Prateek Kumar</h2>
                  <h3 className="dashboard-h3">Software Testing</h3>
                </div>
                <div className="dashboard-flex-item">
                  <div className="dashboard-round-image" id="ashwariya" />
                  <h2 className="dashboard-h2">Aishwariya Singh</h2>
                  <h3 className="dashboard-h3">Software Testing</h3>
                </div>
              </div>
              <div className="dashboard-center-items">
                <div className="dashboard-flex-item">
                  <div className="dashboard-round-image" id="aryan"></div>                
                  <h2 className="dashboard-h2">Aryan Dwivedi</h2>
                  <h3 className="dashboard-h3">Database Administration</h3>
                
                </div>
                <div className="dashboard-flex-item">
                  <div className="dashboard-round-image" id="amisha"></div>                 
                  <h2 className="dashboard-h2">Amisha Kumar</h2>
                  <h3 className="dashboard-h3">Database Administration</h3>
                </div>
              </div>
              <footer className="dashboard-footer">Copyright ESD 2023</footer>
            </>
          </Typography>
        </div>
      </Box>
    </Box>
  );
}
