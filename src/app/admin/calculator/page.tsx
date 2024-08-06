"use client"
import BaseCalculator from "@/components/admin/BaseCalculator";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import NavigationBar from "@/components/admin/Navigation";

function CalculatorListPage() {
  const [isAddingCalculator, setIsAddingCalculator] = useState(false);
  const [calculatorName, setCalculatorName] = useState("");
  const [calculatorId, setCalculatorId] = useState<number | null>(null);

  const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setCalculatorName(e.target.value);
  };

  const toggleAddCalculator = async () => {
    if (!isAddingCalculator) {
      setIsAddingCalculator(true);
    } else {
      try {
        const response = await axios.post('/api/calculators', { name: calculatorName });
        setCalculatorId(response.data.id);
        setIsAddingCalculator(true);
      } catch (error) {
        console.error('Failed to create calculator:', error);
      }
    }
  };

  return (
    <div>
      <NavigationBar />
      <h1 className="text-xl font-bold mb-4">
        <Link className="client-link button-primary" href="/admin/calculator/1">
          Select Calculator
        </Link>
      </h1>
      <button
        className="client-link button-primary"
        onClick={toggleAddCalculator}
      >
        {isAddingCalculator ? "Save Calculator" : "Add New Calculator"}
      </button>
      <div>
        {isAddingCalculator && (
          <div className="mt-6">
            <input
              type="text"
              id="calculatorname"
              name="calculatorname"
              placeholder="Calculator Name"
              value={calculatorName}
              onChange={handleInputChange}
              className="text-left "
            />
            {calculatorId && <BaseCalculator calculatorId={calculatorId} />}
          </div>
        )}
      </div>
    </div>
  );
}

export default CalculatorListPage;