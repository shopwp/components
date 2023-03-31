/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { isOneTimeSubscription } from "Common"
import SellingGroupOnetime from "../selling-group-onetime"

const SellingGroupSubscription = wp.element.lazy(() =>
  import(
    /* webpackChunkName: 'SellingGroupSubscription-public' */ "../selling-group-subscription"
  )
)

function SellingGroup({ sellingGroup, selectedSubscriptionId }) {
  const isSelected = selectedSubscriptionId === sellingGroup.id

  const SellingGroupCSS = css`
    padding: 0;
    display: block;
    background-color: ${isSelected ? "#f1f4fe" : "#f6f6f6"};
    margin-bottom: 10px;
    border-radius: 6px;
    border: 1px dashed ${isSelected ? "blue" : "black"};
    transition: all ease 0.15s;
    position: relative;

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
