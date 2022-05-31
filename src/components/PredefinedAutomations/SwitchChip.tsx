import React from "react"

interface SwitchChipType {
  text: string
  status: boolean
  setStatus: React.Dispatch<React.SetStateAction<boolean>>
}

const SwitchChip: React.FC<SwitchChipType> = ({ text, status, setStatus }) => {
  const clickHandler = () => {
    setStatus(!status)
  }

  const randomNumber = (min: number, max: number) => {
    return Math.random() * (max - min) + min
  }

  return (
    <div
      className={
        status
          ? "pre-defined-filter side-nav-entrance noselect active"
          : "pre-defined-filter side-nav-entrance noselect"
      }
      style={
        {
          "--delay": randomNumber(0.5, 2) + "s",
        } as any
      }
      onClick={clickHandler}
    >
      {text !== "Monitoring" ? (
        <svg viewBox="0 0 12 16">
          <path
            d="M3.20506 0.795844L0.880063 3.12084C0.613396 3.37918 0.796729 3.82918 1.17173 3.82918H2.6634V8.83751C2.6634 
            9.29584 3.0384 9.67084 3.49673 9.67084C3.95506 9.67084 4.33006 9.29584 4.33006 8.83751V3.82918H5.82173C6.19673 
            3.82918 6.38006 3.37918 6.1134 3.12084L3.7884 0.795844C3.63006 0.63751 3.3634 0.63751 3.20506 0.795844ZM9.33006 
            12.1792V7.17084C9.33006 6.71251 8.95506 6.33751 8.49673 6.33751C8.0384 6.33751 7.6634 6.71251 7.6634 7.17084V12.1792H6.17173C5.79673 
            12.1792 5.6134 12.6292 5.88006 12.8875L8.20506 15.2042C8.37173 15.3625 8.63006 15.3625 8.79673 15.2042L11.1217 12.8875C11.3884 
            12.6292 11.1967 12.1792 10.8301 12.1792H9.33006Z"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 18 16">
          <path
            d="M15.6708 0.5H2.33744C1.42078 0.5 0.670776 1.25 0.670776 2.16667V11.3333C0.670776 12.25 1.42078 13 
        2.33744 13H4.83744C4.37911 13.4583 4.00411 13.725 4.00411 14.325C4.00411 14.975 4.52911 15.5 5.17911 15.5H12.8208C13.4708 
        15.5 13.9958 14.975 13.9958 14.325C13.9958 13.725 13.6291 13.4667 13.1624 13H15.6624C16.5791 13 17.3291 12.25 
        17.3291 11.3333V2.16667C17.3374 1.25 16.5874 0.5 15.6708 0.5ZM15.6708 11.3333H2.33744V2.16667H15.6708V11.3333Z"
          />
        </svg>
      )}
      <span>{text}</span>
    </div>
  )
}

export default SwitchChip
