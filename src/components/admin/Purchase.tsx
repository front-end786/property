import BaseComp from "./ui/BaseComp"
function Purchase({ quoteTypeId }: { quoteTypeId: number | null }) {
  return <BaseComp quoteTypeId={quoteTypeId} />;
}

export default Purchase
