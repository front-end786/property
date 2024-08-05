"use client";

import BaseCalculator from "@/components/admin/BaseCalculator";
import React from "react";

function CalculatorPage({ params }: { params: { id: string } }) {
  return <BaseCalculator />;
}

export default CalculatorPage;
