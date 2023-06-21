/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/react"
import { useSelect } from "downshift"
import { usePortal } from "@shopwp/hooks"
import { SlideInFromTop } from "@shopwp/common"

const Loader = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Loader-public' */ "../loader")
)

import SelectItem from "./list-item"

function Select({
  items,
  onChange,
  label = false,
  id = null,
  isBusy = false,
  dropzone = false,
  inline = false,
  missingSelections = false,
  isVariant = false,
  allSelectableOptions = false,
  selectedOptions = null,
  selectedOption = false,
  variants = false,
  settings = false,
}) {
  const { useState, useEffect } = wp.element
  const [selected, setSelected] = useState(selectedOption)

  function itemToString(item) {
    return item ? item.label : ""
  }

  function DownArrow() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
      </svg>
    )
  }

  function UpArrow() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
      </svg>
    )
  }

  function SelectDropdown() {
    const {
      isOpen,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      getItemProps,
    } = useSelect({
      items: items,
      itemToString,
      onSelectedItemChange: (changes) => {
        if (isBusy) {
          return
        }

        if (!changes) {
          return
        }

        onChange(changes.selectedItem)
        setSelected(changes.selectedItem)
      },
    })

    useEffect(() => {
      if (selectedOptions === null) {
        return
      }

      if (!selectedOptions) {
        setSelected(null)
      }
    }, [selectedOptions])

    useEffect(() => {
      if (selected) {
        return
      }
      if (!selectedOption.label) {
        setSelected(null)
        return
      }

      setSelected(selectedOption)
    }, [selectedOption])

    const DropdownCSS = css`
      padding: 10px 45px 10px 10px;
      border: 1px solid
        ${settings && settings.variantDropdownButtonColor
          ? settings.variantDropdownButtonColor
          : "#acacac"};
      border-radius: ${settings.globalBorderRadius};
      box-shadow: ${isOpen && !isBusy
        ? "rgb(38, 132, 255) 0px 0px 0px 1px"
        : "none"};
      transition: all 100ms ease 0s;
      width: 100%;
      box-sizing: border-box;
      position: relative;
      display: flex;
      border-bottom-right-radius: ${isOpen ? "0" : settings.globalBorderRadius};
      border-bottom-left-radius: ${isOpen ? "0" : settings.globalBorderRadius};

      background-color: ${settings && settings.variantDropdownButtonColor
        ? settings.variantDropdownButtonColor
        : "white"};

      &:hover {
        cursor: pointer;
        border: 1px solid #000;
      }

      svg {
        position: absolute;
        top: 12px;
        right: 15px;
        width: ${settings.variantDropdownTypeFontSize
          ? settings.variantDropdownTypeFontSize
          : "15px;"};
        height: ${settings.variantDropdownTypeFontSize
          ? settings.variantDropdownTypeFontSize
          : "15px;"};

        path {
          fill: ${settings && settings.variantLabelTextColor
            ? settings.variantLabelTextColor
            : "#414040"};
        }
      }
    `

    const DropdownLabel = css`
      display: flex;

      color: ${settings && settings.variantLabelTextColor
        ? settings.variantLabelTextColor
        : "black"};
      font-family: ${settings && settings.variantDropdownTypeFontFamily
        ? settings.variantDropdownTypeFontFamily
        : "inherit"};
      font-weight: ${settings && settings.variantDropdownTypeFontWeight
        ? settings.variantDropdownTypeFontWeight
        : "initial"};
      font-style: ${settings && settings.variantDropdownTypeFontStyle
        ? settings.variantDropdownTypeFontStyle
        : "initial"};
      font-size: ${settings && settings.variantDropdownTypeFontSize
        ? settings.variantDropdownTypeFontSize
        : "initial"};
      letter-spacing: ${settings && settings.variantDropdownTypeLetterSpacing
        ? settings.variantDropdownTypeLetterSpacing
        : "initial"};
      line-height: ${settings && settings.variantDropdownTypeLineHeight
        ? settings.variantDropdownTypeLineHeight
        : "initial"};
      text-decoration: ${settings && settings.variantDropdownTypeTextDecoration
        ? settings.variantDropdownTypeTextDecoration
        : "initial"};
      text-transform: ${settings && settings.variantDropdownTypeTextTransform
        ? settings.variantDropdownTypeTextTransform
        : "initial"};

      span {
        margin-left: 7px;
      }
    `

    const animeCSS = keyframes`
      0%,
      100% {
        transform: translateX(0);
      }
      10%,
      30%,
      50%,
      70% {
        transform: translateX(-5px);
      }
      20%,
      40%,
      60% {
        transform: translateX(5px);
      }
      80% {
        transform: translateX(6px);
      }
      90% {
        transform: translateX(-6px);
      }
    `

    const DropdownWrapperCSS = css`
      position: relative;
      width: 100%;
      padding: 0;
      margin-bottom: 10px;
      transition: all 100ms ease 0s;
      min-width: 150px;
      opacity: ${isBusy ? "0.6" : 1};

      animation: ${missingSelections && !selected
        ? css`
            ${animeCSS} 0.8s cubic-bezier(0.455, 0.030, 0.515, 0.955) both
          `
        : "none"};
    `

    const DropdownMenuWrapCSS = css`
      position: relative;
      width: 100%;
      min-width: 200px;
      max-width: 100%;
      z-index: 99999999999;
    `

    const DropdownMenuCSS = css`
      position: absolute;
      top: ${inline ? "0" : "0"};
      left: 0;
      width: 100%;
      background: white;
      list-style: none;
      margin: 0;
      z-index: 99999999999;
      padding: 0;
      opacity: 1;
      border: ${isOpen && !isBusy ? "1px solid rgb(221, 221, 221)" : 0};
      border-radius: ${settings.globalBorderRadius};
      border-top-right-radius: 0;
      border-top-left-radius: 0;
      border-top: 0;
      box-shadow: rgba(0, 0, 0, 0.66) 0px 0px 9px -6px;

      li {
        font-size: ${settings.variantDropdownTypeFontSize};
      }
      > li:last-of-type {
        padding-bottom: 7px;
      }
    `

    const DropdownInnerCSS = css`
      display: flex;
      flex-direction: ${inline ? "row" : "column"};
      align-items: ${inline ? "center" : "flex-start"};
    `

    return usePortal(
      <div css={DropdownWrapperCSS} id={id}>
        <div css={DropdownInnerCSS}>
          <div {...getToggleButtonProps()} css={DropdownCSS}>
            {isBusy ? (
              <Loader color="#000" />
            ) : (
              <div css={DropdownLabel}>
                <label {...getLabelProps()}>
                  {label}
                  {selected ? ":" : null}
                </label>

                {selected ? <span>{selected.label}</span> : null}
              </div>
            )}

            {isOpen && !isBusy ? <UpArrow /> : <DownArrow />}
          </div>
        </div>

        <div css={DropdownMenuWrapCSS} {...getMenuProps()}>
          {isOpen && !isBusy ? (
            <SlideInFromTop>
              <ul css={DropdownMenuCSS}>
                {items.map((item, index) => (
                  <SelectItem
                    key={`${item.value}${index}`}
                    getItemProps={getItemProps}
                    item={item}
                    index={index}
                    selected={selected}
                    isVariant={isVariant}
                    allSelectableOptions={allSelectableOptions}
                    selectedOptions={selectedOptions}
                    variants={variants}
                    settings={settings}
                  />
                ))}
              </ul>
            </SlideInFromTop>
          ) : null}
        </div>
      </div>,
      dropzone
    )
  }

  return <SelectDropdown />
}

export default Select
