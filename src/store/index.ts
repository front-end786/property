import { proxy } from 'valtio';

// Define types based on your schema
type Calculator = {
  id: number;
  name: string;
  quoteTypes: QuoteType[];
};

type QuoteType = {
  id: number;
  calculatorId: number;
  type: QuoteTypeEnum;
  values: Value[];
  supplements: Supplement[];
  disbursements: Disbursement[];
};

type Value = {
  id: number;
  quoteTypeId: number;
  propertyValueStart: number; // Use number for Decimal
  propertyValueEnd: number;   // Use number for Decimal
  legalFees: number;
  percentageOfValue: boolean;
  plusFixedFee: boolean;
  pricedOnApplication: boolean;
};

type Supplement = {
  id: number;
  quoteTypeId: number;
  title: string;
  cost: number; // Use number for Decimal
  free: boolean;
  joinQuotes: boolean;
  perIndividual: boolean;
  variable: boolean;
  pricedOnApplication: boolean;
};

type Disbursement = {
  id: number;
  quoteTypeId: number;
  title: string;
  cost: number; // Use number for Decimal
  free: boolean;
  joinQuotes: boolean;
  perIndividual: boolean;
  variable: boolean;
  pricedOnApplication: boolean;
};

enum QuoteTypeEnum {
  SALE = 'SALE',
  PURCHASE = 'PURCHASE',
  REMORTGAGE = 'REMORTGAGE',
  TRANSFER_OF_EQUITY = 'TRANSFER_OF_EQUITY',
}

// Create the Valtio store
const store = proxy({
  calculators: [] as Calculator[],
});

export default store;