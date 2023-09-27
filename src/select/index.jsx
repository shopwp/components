/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { Menu, MenuButton } from "@szhsin/react-menu"
import "@szhsin/react-menu/dist/index.css"
import "@szhsin/react-menu/dist/transitions/slide.css"
import { usePortal } from "@shopwp/hooks"
import { useSettingsState } from "../items/_state/settings/hooks"
import { mq } from "@shopwp/common"

const Loader = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Loader-public' */ "../loader")
)

import SelectItem from "./list-item"

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

function Dropdown({
  items,
  onChange,
  label = false,
  isBusy = false,
  dropzone = false,
  inline = false,
  missingSelections = false,
  isVariant = false,
  allSelectableOptions = false,
  selectedOptions = null,
  selectedOption = false,
  variants = false,
}) {
  const { useState, useEffect } = wp.element
  const [selected, setSelected] = useState(selectedOption)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedText, setSelectedText] = useState(
    selectedOption ? selectedOption.label : "Select " + label
  )
  const settings = useSettingsState()

  useEffect(() => {
    if (selectedOptions === null) {
      return
    }

    if (!selectedOptions) {
      setSelected(null)
      setSelectedText("Select " + label)
    }
  }, [selectedOptions])

  const DropdownButtonCSS = css`
    && {
      padding: 10px 45px 10px 10px;
      display: block;
      width: 100%;
      min-width: 200px;
      text-align: left;
      background: white;
      position: relative;

      box-shadow: ${missingSelections && !selected
        ? "0px 0px 0px 1px red"
        : selected && !inline
        ? "0px 0px 0px 1px #44d444"
        : "none"};

      border: 1px solid
        ${settings &&
        settings.variantDropdownButtonColor &&
        settings.variantDropdownButtonColor !== "white" &&
        settings.variantDropdownButtonColor !== "#ffffff"
          ? settings.variantDropdownButtonColor
          : "#606060"};
      border-radius: ${settings.globalBorderRadius};
      transition: all 100ms ease 0s;

      background-color: ${settings && settings.variantDropdownButtonColor
        ? settings.variantDropdownButtonColor
        : "white"};

      color: ${settings && settings.variantDropdownButtonTextColor
        ? settings.variantDropdownButtonTextColor
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
          fill: ${settings && settings.variantDropdownButtonTextColor
            ? settings.variantDropdownButtonTextColor
            : "white"};
        }
      }

      &:hover {
        cursor: pointer;
      }
    }
  `

  const DropdownLabel = css`
    margin-top: 10px;
    position: relative;

    ${mq("small")} {
      flex: 1;
    }

    .szh-menu {
      border: 1px solid #a7a7a7;
      border-radius: 5px;
      top: 5px;
      padding: 0;
      width: ${inline ? "auto" : "100%"};
      min-width: ${inline ? "200px" : "auto"};

      > [class*="DropdownMenuItemCSS"]:first-of-type,
      > [class*="DropdownMenuItemCSS"]:first-of-type li {
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
      }

      > [class*="DropdownMenuItemCSS"]:last-of-type,
      > [class*="DropdownMenuItemCSS"]:last-of-type li {
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
      }
    }

    .szh-menu-container--itemTransition .szh-menu__item {
      transition-duration: 0s;
    }

    .szh-menu-container {
      width: ${inline ? "auto" : "100%"};
    }

    .wps-loader-wrapper {
      position: absolute;
      left: 10px;
      top: 30px;
      z-index: 2;
      background: ${settings && settings.variantDropdownButtonColor
        ? settings.variantDropdownButtonColor
        : "black"};
      width: 70%;
      padding: 10px 5px;
    }

    label {
      margin-bottom: 5px;
      font-size: 15px;
      display: inline-block;
      color: ${settings && settings.variantLabelTextColor
        ? settings.variantLabelTextColor
        : "black"};
    }
  `

  function onMenuChange(open) {
    setIsOpen(open.open)
  }

  function onItemClick(event) {
    var found = items.filter((i) => i.value === event.value)[0]

    onChange(found)

    setSelected(found)
    setSelectedText(found.value)
  }

  return usePortal(
    <div css={DropdownLabel}>
      <label>{label}</label>
      {isBusy ? (
        <Loader
          color={
            settings && settings.variantDropdownButtonTextColor
              ? settings.variantDropdownButtonTextColor
              : "black"
          }
        />
      ) : null}
      <Menu
        aria-label="Select dropdown menu"
        onItemClick={onItemClick}
        gap={5}
        onMenuChange={onMenuChange}
        menuButton={
          <MenuButton css={DropdownButtonCSS}>
            {selectedText} {isOpen && !isBusy ? <UpArrow /> : <DownArrow />}
          </MenuButton>
        }
        transition
      >
        {items.map((item, index) => (
          <SelectItem
            key={`${item.label}${index}`}
            item={item}
            selected={selected}
            isVariant={isVariant}
            allSelectableOptions={allSelectableOptions}
            selectedOptions={selectedOptions}
            variants={variants}
            settings={settings}
          />
        ))}
      </Menu>
    </div>,
    dropzone
  )
}

export default Dropdown
