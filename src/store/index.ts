import { proxy } from 'valtio';

// Define types based on your schema
type Value = {
  id: number;
  quoteTypeId: number;
  propertyValueStart: number;
  propertyValueEnd: number;
  legalFees: number;
  percentageOfValue: boolean;
  plusFixedFee: boolean;
  pricedOnApplication: boolean;
};

type Supplement = {
  id: number;
  quoteTypeId: number;
  title: string;
  cost: number;
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
  cost: number;
  free: boolean;
  joinQuotes: boolean;
  perIndividual: boolean;
  variable: boolean;
  pricedOnApplication: boolean;
};

type QuoteType = {
  id: number;
  calculatorId: number;
  type: QuoteTypeEnum;
  values: Value[];
  supplements: Supplement[];
  disbursements: Disbursement[];
};

type Calculator = {
  id: number;
  name: string;
  quoteTypes: QuoteType[];
};

enum QuoteTypeEnum {
  SALE = 'SALE',
  PURCHASE = 'PURCHASE',
  REMORTGAGE = 'REMORTGAGE',
  TRANSFER_OF_EQUITY = 'TRANSFER_OF_EQUITY',
}

const defaultQuoteType = {
  feeTable: [{ id: Date.now(), quoteTypeId: 0, propertyValueStart: 0, propertyValueEnd: 100000, legalFees: 100, percentageOfValue: false, plusFixedFee: false, pricedOnApplication: false }],
  supplements: [{ id: Date.now(), quoteTypeId: 0, title: "", cost: 0, free: false, joinQuotes: false, perIndividual: false, variable: false, pricedOnApplication: false }],
  disbursements: [{ id: Date.now(), quoteTypeId: 0, title: "", cost: 0, free: false, joinQuotes: false, perIndividual: false, variable: false, pricedOnApplication: false }],
};

// Create the Valtio store
const store = proxy<{
  calculators: Calculator[];
  currentCalculator: {
    name: string;
    quoteTypes: Record<QuoteTypeEnum, {
      feeTable: Value[];
      supplements: Supplement[];
      disbursements: Disbursement[];
    }>;
  };
  activeQuoteType: QuoteTypeEnum;
  isAddingCalculator: boolean;
  isSaving: boolean;
}>({
  calculators: [],
  currentCalculator: {
    name: '',
    quoteTypes: {
      [QuoteTypeEnum.SALE]: { ...defaultQuoteType },
      [QuoteTypeEnum.PURCHASE]: { ...defaultQuoteType },
      [QuoteTypeEnum.REMORTGAGE]: { ...defaultQuoteType },
      [QuoteTypeEnum.TRANSFER_OF_EQUITY]: { ...defaultQuoteType },
    },
  },
  activeQuoteType: QuoteTypeEnum.SALE,
  isAddingCalculator: false,
  isSaving: false,
});

// Functions to update store
function setCalculatorName(name: string) {
  store.currentCalculator.name = name;
}

function setActiveQuoteType(type: QuoteTypeEnum) {
  store.activeQuoteType = type;
}

function updateFeeTable(type: QuoteTypeEnum, feeTable: Value[]) {
  store.currentCalculator.quoteTypes[type].feeTable = feeTable;
}

function updateSupplements(type: QuoteTypeEnum, supplements: Supplement[]) {
  store.currentCalculator.quoteTypes[type].supplements = supplements;
}

function updateDisbursements(type: QuoteTypeEnum, disbursements: Disbursement[]) {
  store.currentCalculator.quoteTypes[type].disbursements = disbursements;
}

function toggleAddingCalculator() {
  store.isAddingCalculator = !store.isAddingCalculator;
  if (!store.isAddingCalculator) {
    store.currentCalculator = {
      name: '',
      quoteTypes: {
        [QuoteTypeEnum.SALE]: { ...defaultQuoteType },
        [QuoteTypeEnum.PURCHASE]: { ...defaultQuoteType },
        [QuoteTypeEnum.REMORTGAGE]: { ...defaultQuoteType },
        [QuoteTypeEnum.TRANSFER_OF_EQUITY]: { ...defaultQuoteType },
      },
    };
  }
}

function setIsSaving(isSaving: boolean) {
  store.isSaving = isSaving;
}

export { 
  store, 
  QuoteTypeEnum, 
  setCalculatorName, 
  setActiveQuoteType, 
  updateFeeTable, 
  updateSupplements, 
  updateDisbursements,
  toggleAddingCalculator,
  setIsSaving
};