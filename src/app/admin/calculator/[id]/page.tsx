"use client";
import Purchase from "@/components/admin/Purchase";
import Remortgage from "@/components/admin/Remortgage";
import Sale from "@/components/admin/Sale";
import Transfer_Equity from "@/components/admin/Transfer_Equity";
import React, { useState } from "react";

function CalculatorPage({ params }: { params: { id: string } }) {
  const [activeButton, setActiveButton] = useState<string>(buttons[0].label);
  const [activeComponent, setActiveComponent] = useState<React.ReactNode>(
    <Sale />
  );

  const [heading, setHeading] = useState<string>(buttons[0].heading);

  const handleButtonClick = (button: Button) => {
    setActiveButton(button.label);
    setActiveComponent(button.component);
    setHeading(button.heading);
  };

  return (
    <div className="main">
      <h1 className="page-head-text">
        {heading} {params.id}
      </h1>
      <div className="parent-basic">
        {buttons.map((button) => (
          <button
            key={button.label}
            className={
              activeButton !== button.label
                ? "button-primary button-primary-small"
                : "secondary-button"
            }
            onClick={() => handleButtonClick(button)}
          >
            {button.label}
          </button>
        ))}
      </div>
      {activeComponent}
    </div>
  );
}

export default CalculatorPage;
