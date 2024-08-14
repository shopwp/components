import { isOneTimeSub } from "@shopwp/common"
import SellingGroupOnetime from "../selling-group-onetime"
import SellingGroupSubscription from "../selling-group-subscription"

function SellingGroup({ isSelected, subType, index }) {
  return (
    <div
      className="swp-selling-group shopwp-selling-group"
      data-is-selected={isSelected}
    >
      {isOneTimeSub(subType) ? (
        <SellingGroupOnetime isSelected={isSelected} index={index} />
      ) : (
        <SellingGroupSubscription isSelected={isSelected} index={index} />
      )}
    </div>
  )
}

export default SellingGroup
