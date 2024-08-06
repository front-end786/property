import BaseComp from "./ui/BaseComp"
function Remortgage({ quoteTypeId }: { quoteTypeId: number | null }) {
  return <BaseComp quoteTypeId={quoteTypeId} />;
}

export default Remortgage