import Link from 'next/link'
import React from 'react'

function CalculatorListPage() {
  return (
    <div> <h1 className="">
    <Link className="client-link button-primary" href="/admin/calculator/1000">
      Select Calculator
    </Link>
 
  </h1></div>
  )
}

export default CalculatorListPage