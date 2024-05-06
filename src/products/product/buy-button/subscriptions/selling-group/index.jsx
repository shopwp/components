import { isOneTimeSub } from "@shopwp/common"
import SellingGroupOnetime from "../selling-group-onetime"
import SellingGroupSubscription from "../selling-group-subscription"

function SellingGroup({ isSelected, subType }) {
  return (
    <div
      className="swp-selling-group shopwp-selling-group"
      data-is-selected={isSelected}
    >
      {isOneTimeSub(subType) ? (
        <SellingGroupOnetime isSelected={isSelected} />
      ) : (
        <SellingGroupSubscription isSelected={isSelected} />
      )}
    </div>
  )
}

export default SellingGroup
