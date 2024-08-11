import React, { FC, useState, useCallback } from 'react';
import  {QuoteTypeEnum}  from '@/store';
import FeeTable from './FeeTable';
import { Disbursements, Supplement } from './Field';

interface Button {
    label: string;
    component: FC<{ type: QuoteTypeEnum }>;
    heading: string;
    type: QuoteTypeEnum;
  }
  

  // Define the QuoteType type if not already defined
  interface QuoteType {
    id: number;
    calculatorId: number;
    type: QuoteTypeEnum;
    values: any[]; // Specify the type according to your data structure
    supplements: any[]; // Specify the type according to your data structure
    disbursements: any[]; // Specify the type according to your data structure
  }
  
  const BaseComp: FC<{ type: QuoteTypeEnum }> = ({ type }) => {
    return (
      <div className="pb-20">
        <FeeTable type={type} />
        <div className="lg:flex-row items-center lg:items-start flex flex-col border-t mt-10 pt-10 border-gray-400">
          <Supplement type={type} />
          <Disbursements type={type} />
        </div>
      </div>
    );
  };
  
  const buttons: Button[] = [
    {
      label: "Property Sale",
      component: BaseComp,
      heading: "Sales",
      type: QuoteTypeEnum.SALE,
    },
    {
      label: "Property Purchase",
      component: BaseComp,
      heading: "Purchase",
      type: QuoteTypeEnum.PURCHASE,
    },
    {
      label: "Remortgage",
      component: BaseComp,
      heading: "Remortgage",
      type: QuoteTypeEnum.REMORTGAGE,
    },
    {
      label: "Transfer of Equity",
      component: BaseComp,
      heading: "Transfer of Equity",
      type: QuoteTypeEnum.TRANSFER_OF_EQUITY,
    },
  ];
  
  // BaseCalculator is the main component of the whole app. whole app works on the base of BaseCalculator
  const BaseCalculator: FC = () => {
    const [activeButton, setActiveButton] = useState<Button>(buttons[0]);
  

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
              onClick={() => setActiveButton(button)}
            >
              {button.label}
            </button>
          ))}
        </div>
        {activeButton.component && <activeButton.component type={activeButton.type} />} 
      </div>
    );
  };
  
  export default BaseCalculator;