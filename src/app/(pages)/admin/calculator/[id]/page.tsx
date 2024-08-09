"use client";

// import BaseCalculator from "@/components/admin/BaseCalculator";
import React from "react";

function CalculatorPage({ params }: { params: { id: string } }) {
  return (
    <div>
      {params.id}
      <div>
        {/* <BaseCalculator /> */}
      </div>
    </div>
  );
}

export default CalculatorPage;
