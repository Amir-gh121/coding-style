import dataType from "./dataType"

interface SwitchChipType {
  text: string
  list: string[]
  setData: React.Dispatch<React.SetStateAction<dataType[]>>
  noFilter: dataType[]
}

export default SwitchChipType
