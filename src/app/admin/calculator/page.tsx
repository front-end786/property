import Link from 'next/link'
import React from 'react'

function CalculatorListPage() {
  return (
    <div className="h-screen grid place-items-center">
      {" "}
      <h1 className="">
        <Link className="client-link button-primary" href="/admin/calculator/1">
          Select Calculator
        </Link>
      </h1>
    </div>
  );
}

export default CalculatorListPage