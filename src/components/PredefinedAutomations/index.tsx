import { useState, useEffect } from "react"
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
      <div className="filter-wrapper">
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
      <div className="pre-defined-product-container">
        {listHandler(dataList)}
      </div>
    </div>
  )
}

export default PredefinedAutomations
