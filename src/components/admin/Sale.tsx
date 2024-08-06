import BaseComp from "./ui/BaseComp"
function Sale({ quoteTypeId }: { quoteTypeId: number | null }) {
  
  return (
   <BaseComp quoteTypeId={quoteTypeId}/>
  );
}

export default Sale;
