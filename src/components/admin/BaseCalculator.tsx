"use client";
import React, { useState, useEffect, useCallback, FC } from "react";
import axios from "axios";
import Purchase from "@/components/admin/Purchase";
import Remortgage from "@/components/admin/Remortgage";
import Sale from "@/components/admin/Sale";
import Transfer_Equity from "@/components/admin/Transfer_Equity";

interface Button {
  label: string;
  component: FC<{ quoteTypeId: number | null }>;
  heading: string;
  quoteType: string;
}

interface ComponentProps {
  quoteTypeId: number | null;
}

const buttons: Button[] = [
  { label: "Property Sale", component: Sale as FC<ComponentProps>, heading: "Sales", quoteType: "SALE" },
  { label: "Property Purchase", component: Purchase as FC<ComponentProps>, heading: "Purchase", quoteType: "PURCHASE" },
  { label: "Remortgage", component: Remortgage as FC<ComponentProps>, heading: "Remortgage", quoteType: "REMORTGAGE" },
  { label: "Transfer of Equity", component: Transfer_Equity as FC<ComponentProps>, heading: "Transfer of Equity", quoteType: "TRANSFER_OF_EQUITY" },
];

function BaseCalculator({ calculatorId }: { calculatorId: number }) {
  const [activeButton, setActiveButton] = useState<Button>(buttons[0]); // Default to the first button
  const [quoteTypeId, setQuoteTypeId] = useState<number | null>(null);

  const createQuoteType = useCallback(async (quoteType: string) => {
    try {
      const response = await axios.post('/api/quoteTypes', {
        calculatorId,
        type: quoteType,
      });
      setQuoteTypeId(response.data.id);
    } catch (error) {
      console.error('Failed to create quote type:', error);
    }
  }, [calculatorId]);

  useEffect(() => {
    if (calculatorId) {
      createQuoteType(activeButton.quoteType);
    }
  }, [calculatorId, activeButton.quoteType, createQuoteType]);

  const handleButtonClick = useCallback((button: Button) => {
    setActiveButton(button);
    setQuoteTypeId(null); // Reset quoteTypeId before creating a new one
    createQuoteType(button.quoteType); // Create quote type for the new active button
  }, [createQuoteType]);

  return (
    <div className="main">
      <h1 className="page-head-text">{activeButton.heading}</h1>

      <div className="parent-basic">
        {buttons.map((button) => (
          <button
            key={button.label}
            className={
              activeButton.label !== button.label
                ? "button-primary button-primary-small"
                : "secondary-button"
            }
            onClick={() => handleButtonClick(button)}
          >
            {button.label}
          </button>
        ))}
      </div>
      {React.createElement(activeButton.component, { quoteTypeId })}
      
    </div>
  );
}

export default BaseCalculator;
