/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { isOneTimeSubscription } from "@shopwp/common"
import SellingGroupOnetime from "../selling-group-onetime"
import SellingGroupSubscription from "../selling-group-subscription"

function SellingGroup({ sellingGroup, selectedSubscriptionId }) {
  const isSelected = selectedSubscriptionId === sellingGroup.id

  const SellingGroupCSS = css`
    padding: 0 10px 0 10px;
    display: block;
    background-color: ${isSelected ? "#f1f4fe" : "#f6f6f6"};
    margin-bottom: 10px;
    border-radius: ${shopwp.general.globalBorderRadius};
    border: 1px dashed ${isSelected ? "blue" : "black"};
    transition: all ease 0.15s;
    position: relative;

    .szh-menu-button {
      margin-bottom: 10px;
    }

    [class*="DropdownLabel"] {
      label {
        margin-top: -10px;
        display: block;
      }
    }

    &:hover {
      background-color: ${isSelected ? "#f1f4fe" : "#efefef"};
    }
  `

  return (
    <div
      className="shopwp-selling-group"
      css={SellingGroupCSS}
      data-is-selected={isSelected}
    >
      {isOneTimeSubscription(sellingGroup.id) ? (
        <SellingGroupOnetime
          isSelected={isSelected}
          sellingGroup={sellingGroup}
        />
      ) : (
        <SellingGroupSubscription
          isSelected={isSelected}
          sellingGroupId={sellingGroup.id}
          selectedSubscriptionId={selectedSubscriptionId}
        />
      )}
    </div>
  )
}

export default SellingGroup
