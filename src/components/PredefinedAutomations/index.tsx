import { useState, useEffect, useRef } from "react"
import json from "../../json/sample-1-click-automations.json"
import dataType from "./dataType"
import SwitchChip from "./SwitchChip"
import "./style.css"
import MultiSelectChip from "./MultiSelectChip"
import SingleSelectChip from "./SingleSelectChip"

const PredefinedAutomations: React.FC = () => {
  const [dataList, setDataList] = useState<dataType[]>([])
  const [noneFilteredData, setnoneFilteredData] = useState<dataType[]>([])
  const [extractData, setExtractData] = useState<boolean>(false)
  const [monitoring, setMonitoring] = useState<boolean>(false)
  const [chevronRight, setChevronRight] = useState<boolean>(false)
  const [chevronLeft, setChevronLeft] = useState<boolean>(false)
  const [sitesList, setSitesList] = useState<string[]>([])
  const [categories, setCategories] = useState<string[]>([])

  const objTemp = Object.values(json.data.oneClickAutomations.items)

  useEffect(() => {
    setDataList(objTemp)
    setnoneFilteredData(objTemp)

    let sites = objTemp.map((a) => a.sites[0].title)
    setSitesList([...Array.from(new Set(sites))])

    let cats = objTemp.map((a) => a.categories[0]?.title)
    cats = cats.filter(Boolean)
    setCategories([...Array.from(new Set(cats))])
  }, [])

  const randomNumber = (min: number, max: number) => {
    return Math.random() * (max - min) + min
  }

  const listHandler = (list: dataType[]) => {
    if (!list) return
    return list.map((lst, i) => (
      <div
        className="pre-defined-product-box main-entrance"
        style={
          {
            "--delay": randomNumber(0, 0.5) + "s",
          } as any
        }
        key={lst.id}
      >
        <picture>
          <img src={lst.sites[0].logoSmall2x} alt={lst.sites[0].slug} />
        </picture>
        <h3>{lst.title}</h3>
        <p>{lst.shortDescription}</p>
      </div>
    ))
  }

  const outer = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!(outer.current && inner.current)) return
    if (outer.current.offsetWidth < inner.current.scrollWidth) {
      setChevronRight(true)
    } else {
      setChevronRight(false)
    }
    if (
      !isNaN(parseInt(inner.current.style.left)) &&
      parseInt(inner.current.style.left) < 0
    ) {
      setChevronLeft(true)
    } else {
      setChevronLeft(false)
    }
  }, [dataList])

  let intervalSlide: any

  const chevronRightHandler = () => {
    if (!(outer.current && inner.current)) return
    let dif: number = inner.current.scrollWidth - outer.current.offsetWidth + 40
    if (Math.abs(parseInt(inner.current.style.left)) > dif) return
    intervalSlide = setInterval(() => {
      if (!(outer.current && inner.current)) return
      if (Math.abs(parseInt(inner.current.style.left)) > dif) return
      let leftValue = (
        (parseInt(inner.current.style.left) < 0
          ? parseInt(inner.current.style.left)
          : -10) -
        3 +
        "px"
      ).replace(/NaN/g, "")
      inner.current.style.left = leftValue
    }, 10)
  }
  const chevronRightHandlerEnd = () => {
    if (!(outer.current && inner.current)) return
    clearInterval(intervalSlide)
    setChevronLeft(true)
  }
  const chevronLeftHandler = () => {
    if (!(outer.current && inner.current)) return
    if (parseInt(inner.current.style.left) >= -1) return
    intervalSlide = setInterval(() => {
      if (!(outer.current && inner.current)) return
      if (parseInt(inner.current.style.left) >= -1) return
      let leftValue = (
        (parseInt(inner.current.style.left) < 0
          ? parseInt(inner.current.style.left)
          : -10) +
        3 +
        "px"
      ).replace(/NaN/g, "")
      inner.current.style.left = leftValue
    }, 10)
  }
  const chevronLeftHandlerEnd = () => {
    if (!(outer.current && inner.current)) return
    clearInterval(intervalSlide)
  }

  return (
    <div className="container">
      <div className="predefined-atomations-header">
        <div className="predefined-atomations-title">
          <h1>One-Click Automation</h1>
          <a href="/">See all</a>
        </div>
        <p>
          Here are some Automations that pre-defined for product availability
          monitoring.
        </p>
      </div>
      <div className="filter-wrapper" ref={outer}>
        <svg
          className={
            chevronRight
              ? "noselect chevron right active"
              : "noselect chevron right"
          }
          viewBox="0 0 16 16"
          onMouseDown={chevronRightHandler}
          onMouseUp={chevronRightHandlerEnd}
          onTouchStart={chevronRightHandler}
          onTouchEnd={chevronRightHandlerEnd}
        >
          <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
        </svg>
        <svg
          className={
            chevronLeft
              ? "noselect chevron left active"
              : "noselect chevron left"
          }
          viewBox="0 0 16 16"
          onMouseDown={chevronLeftHandler}
          onMouseUp={chevronLeftHandlerEnd}
          onTouchStart={chevronLeftHandler}
          onTouchEnd={chevronLeftHandlerEnd}
        >
          <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
        </svg>
        <div className="single-filters-wrapper" ref={inner}>
          <SwitchChip
            text="Extract Data"
            status={extractData}
            setStatus={setExtractData}
          />
          <SwitchChip
            text="Monitoring"
            status={monitoring}
            setStatus={setMonitoring}
          />
          {sitesList?.length > 0 && (
            <MultiSelectChip
              text="Filter by Site"
              list={sitesList}
              setData={setDataList}
              noFilter={noneFilteredData}
            />
          )}
          {categories?.length > 0 && (
            <SingleSelectChip
              text="Filter by Categorie"
              list={categories}
              setData={setDataList}
              noFilter={noneFilteredData}
            />
          )}
        </div>
      </div>
      <div className="pre-defined-product-container">
        {listHandler(dataList)}
      </div>
    </div>
  )
}

export default PredefinedAutomations
