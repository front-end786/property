"use client";
import Purchase from "@/components/admin/Purchase";
import Remortgage from "@/components/admin/Remortgage";
import Sale from "@/components/admin/Sale";
import Transfer_Equity from "@/components/admin/Transfer_Equity";
import React, { useState } from "react";

function AdminPage() {
  const [activeButton, setActiveButton] = useState("");
  const [name, setName] = useState(<></>);
  const [heading, setHeading] = useState("Admin Page");

  const buttons = [
    { label: "Property Sale", component: <Sale />, heading: "Sales" },
    {
      label: "Property Purchase",
      component: <Purchase />,
      heading: "Purchase",
    },
    { label: "Remortgage", component: <Remortgage />, heading: "Remortgage" },
    {
      label: "Transfer of Equity",
      component: <Transfer_Equity />,
      heading: "Transfer of Equality",
    },
  ];

  return (
    <div className="main">
      <h1 className="page-head-text">{heading}</h1>
      <div className="">
        <div className="parent-basic">
          {buttons.map((button) => (
            <button
              key={button.label}
              className={
                activeButton !== button.label
                  ? "button-primary button-primary-small"
                  : "secondary-button"
              }
              onClick={() => {
                setActiveButton(button.label);
                setName(button.component);
                setHeading(button.heading);
              }}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>

      {name}
    </div>
  );
}

export default AdminPage;
