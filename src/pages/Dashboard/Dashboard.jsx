import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "../../pages/Dashboard/Dashboard.scss";
import TopSection from "../../components/TopSection/TopSection";
import { Outlet, useLocation, useNavigate } from "react-router";

const Dashboard = () => {
  const navigate=useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      navigate("/dashboard/destination-list");
    }
  }, [location, navigate]);

  return (
    <>
      <TopSection title="Dashboard" currentPage="Dashboard" />

      <section className=" dashboard">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12 col-lg-3 col-md-3 col-sm-12 col-xs-12">
              <div className="left-part-main">
                <div className="left-part-body">
                  <Sidebar />
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-9 col-md-9 col-sm-12 col-xs-12">
              <div className="right-part-main">
                <div className="right-part-body">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
