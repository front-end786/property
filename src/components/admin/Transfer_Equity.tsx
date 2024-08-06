import BaseComp from "./ui/BaseComp"
function Transfer_Equity({ quoteTypeId }: { quoteTypeId: number | null }) {
  return <BaseComp quoteTypeId={quoteTypeId} />;
}

export default Transfer_Equity;
