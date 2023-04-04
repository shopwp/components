/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { usePortal } from "@shopwp/hooks"
import Select from "react-select"

function Selects({
  dropzone,
  labelText,
  selectId,
  options,
  isLoading,
  customOnChange,
  defaultValue,
}) {
  const { useState } = wp.element
  const [selectVal, setSelectVal] = useState(defaultValue)

  const SelectCSS = css`
    width: 200px;

    &:hover {
      cursor: pointer;
    }

    &:disabled {
      &:hover {
        cursor: not-allowed;
      }
    }
  `

  const LabelCSS = css`
    font-weight: bold;
    text-align: right;
    padding-right: 10px;
    font-size: 15px;
  `

  const SelectWrapperCSS = css`
    display: flex;
    align-items: center;
    margin-left: 20px;

    #swp-sortby *:hover,
    #swp-pagesize *:hover {
      cursor: pointer;
    }

    div[class*="control"] {
      border-color: #aeaeae;
    }
  `

  async function onChange(value) {
    setSelectVal(value)
    customOnChange(value)
  }

  return usePortal(
    <div
      className="swp-select"
      aria-label={"Sort products"}
      css={SelectWrapperCSS}
    >
      <label htmlFor={selectId} css={LabelCSS}>
        {labelText}
      </label>

      <Select
        id={selectId}
        css={SelectCSS}
        value={selectVal}
        onChange={onChange}
        options={options}
        defaultValue={defaultValue}
        isDisabled={isLoading}
      />
    </div>,
    dropzone
  )
}

export default Selects
