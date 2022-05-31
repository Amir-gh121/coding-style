import React, { useEffect, useRef, useState } from "react"
import { Scrollbars } from "react-custom-scrollbars"
import dataType from "./dataType"

interface SwitchChipType {
  text: string
  list: string[]
  setData: React.Dispatch<React.SetStateAction<dataType[]>>
  noFilter: dataType[]
}

const SingleSelectChip: React.FC<SwitchChipType> = ({
  text,
  list,
  setData,
  noFilter,
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [renderList, setRenderList] = useState<string[]>(list)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [searched, setSearched] = useState<string>("")

  const wrapperRef = useRef(null)

  const useOutsideAlerter = (ref: any) => {
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpen(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [ref])
  }

  useOutsideAlerter(wrapperRef)

  const input = useRef(null)

  const addFilterHandler = (target: string) => {
    if (selectedOptions.includes(target)) return
    setSelectedOptions([...selectedOptions, target])
  }
  const removeFilterHandler = (target: number) => {
    setSelectedOptions(selectedOptions.filter((_, i) => i !== target))
  }

  const listHandler = (list: string[]) => {
    if (!list) return
    return list.map((
      lst,
      i //Using i for key isn't best practice - here is for the sake of time
    ) => (
      <li key={i} onClick={() => addFilterHandler(lst)}>
        {lst}
      </li>
    ))
  }

  const filterListHandler = (list: string[]) => {
    if (!list) return
    return list.map((
      lst,
      i //Using i for key isn't best practice - here is for the sake of time
    ) => (
      <div
        key={i}
        onClick={() => removeFilterHandler(i)}
        className="pre-defined-filter noselect active"
      >
        {lst}
        <svg viewBox="0 0 12 12">
          <path
            d="M11 6.83332H6.83329V11C6.83329 11.4583 6.45829 11.8333 5.99996 11.8333C5.54163 11.8333 5.16663 11.4583 5.16663 
        11V6.83332H0.999959C0.541626 6.83332 0.166626 6.45832 0.166626 5.99999C0.166626 5.54166 0.541626 5.16666 0.999959 
        5.16666H5.16663V0.99999C5.16663 0.541656 5.54163 0.166656 5.99996 0.166656C6.45829 0.166656 6.83329 0.541656 6.83329 
        0.99999V5.16666H11C11.4583 5.16666 11.8333 5.54166 11.8333 5.99999C11.8333 6.45832 11.4583 6.83332 11 6.83332Z"
          />
        </svg>
      </div>
    ))
  }

  const searchHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setSearched(e.currentTarget.value)
  }

  useEffect(() => {
    setRenderList(list.filter((d) => d.toLowerCase().includes(searched)))
  }, [searched, list])

  const modalToggleHandler = (e: React.FormEvent) => {
    if (e.target === input.current) return
    setOpen(!open)
  }

  useEffect(() => {
    if (selectedOptions.length < 1) {
      setData(noFilter)
      return
    }
    setData(
      noFilter.filter((d) => selectedOptions.includes(d.categories[0]?.title))
    )
  }, [selectedOptions, noFilter, setData])

  return (
    <>
      {selectedOptions.length < 1 && (
        <div
          className={
            selectedOptions.length > 0
              ? "pre-defined-filter noselect side-nav-entrance active select-chip"
              : "pre-defined-filter noselect side-nav-entrance select-chip"
          }
          style={
            {
              "--delay": "1s",
            } as any
          }
          ref={wrapperRef}
          onClick={(e) => modalToggleHandler(e)}
        >
          <svg viewBox="0 0 12 12">
            <path
              d="M11 6.83332H6.83329V11C6.83329 11.4583 6.45829 11.8333 5.99996 11.8333C5.54163 11.8333 5.16663 11.4583 5.16663 
        11V6.83332H0.999959C0.541626 6.83332 0.166626 6.45832 0.166626 5.99999C0.166626 5.54166 0.541626 5.16666 0.999959 
        5.16666H5.16663V0.99999C5.16663 0.541656 5.54163 0.166656 5.99996 0.166656C6.45829 0.166656 6.83329 0.541656 6.83329 
        0.99999V5.16666H11C11.4583 5.16666 11.8333 5.54166 11.8333 5.99999C11.8333 6.45832 11.4583 6.83332 11 6.83332Z"
            />
          </svg>

          <span>{text}</span>
          {open && (
            <div className="filter-selection-modal single">
              <Scrollbars autoHide>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searched}
                  onChange={(e) => searchHandler(e)}
                  ref={input}
                />
                <ul>{listHandler(renderList)}</ul>
              </Scrollbars>
            </div>
          )}
        </div>
      )}
      {selectedOptions.length > 0 && (
        <div className="filter-list-wrapper">
          {filterListHandler(selectedOptions)}
        </div>
      )}
    </>
  )
}

export default SingleSelectChip
