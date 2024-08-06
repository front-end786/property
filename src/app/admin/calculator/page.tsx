import BaseCalculator from '@/components/admin/BaseCalculator'
import Link from 'next/link'
import React from 'react'

function CalculatorListPage() {
  return (
    <div> <h1 className="">
    <Link className="client-link button-primary" href="/admin/calculator/1">
      Select Calculator
    </Link>
 
  </h1></div>
  )
}

export default CalculatorListPage