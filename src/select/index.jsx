/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { Menu, MenuButton } from "@szhsin/react-menu"
import "@szhsin/react-menu/dist/index.css"
import "@szhsin/react-menu/dist/transitions/slide.css"
import { usePortal } from "@shopwp/hooks"

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
  settings,
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
  selectedVariant = null,
}) {
  const { useState, useEffect } = wp.element
  const [selected, setSelected] = useState(selectedOption)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedText, setSelectedText] = useState(
    selectedOption ? label + ": " + selectedOption.label : label
  )
  useEffect(() => {
    if (selectedOptions === null) {
      return
    }

    if (!selectedOptions) {
      setSelected(null)
      setSelectedText(label)
    } else if (selectedOption) {
      if (selectedVariant) {
        setSelected(true)
      } else {
        setSelected(false)
      }

      if (selectedOption.label) {
        setSelectedText(label + ": " + selectedOption.label)
      } else {
        setSelectedText(label + ": " + selectedOption.value.name)
      }
    }
  }, [selectedOptions, selectedOption])

  const DropdownButtonCSS = css``
  const DropdownLabel = css``

  function onMenuChange(open) {
    setIsOpen(open.open)
  }

  function onItemClick(event) {
    var found = items.filter((i) => i.value === event.value)[0]

    onChange(found)

    setSelected(found)
    setSelectedText(label + ": " + found.value)
  }

  return items
    ? usePortal(
        <div
          data-is-inline={inline}
          data-is-selected={selected}
          data-is-missing-selections={missingSelections}
          className="swp-dropdown-label"
          css={DropdownLabel}
        >
          {isBusy ? <Loader /> : null}
          <Menu
            aria-label="Select dropdown menu"
            onItemClick={onItemClick}
            gap={5}
            onMenuChange={onMenuChange}
            menuButton={
              <MenuButton css={DropdownButtonCSS}>
                <span>
                  {wp.hooks.applyFilters(
                    "product.optionName",
                    selectedText,
                    selectedOption
                  )}
                </span>{" "}
                {isOpen && !isBusy ? <UpArrow /> : <DownArrow />}
              </MenuButton>
            }
            transition
          >
            {items.length
              ? items.map((item, index) => (
                  <SelectItem
                    key={item.value + index}
                    item={item}
                    selected={selected}
                    isVariant={isVariant}
                    allSelectableOptions={allSelectableOptions}
                    selectedOptions={selectedOptions}
                    variants={variants}
                    settings={settings}
                  />
                ))
              : null}
          </Menu>
        </div>,
        dropzone
      )
    : null
}

export default Dropdown
