import React, { useEffect, useState } from "react"
const Dropdown = ({
    item,
    itemList,
    handleUpdate,
    selfIndex,
    parentIndex,
    width,
    padding
}) => {
    const [isActive, setIsActive] = useState(false)
    const options = ["Yes", "No"]
    const [selected, setSelected] = useState("")
    const [scrollFix, setScrollFix] = useState(false)

    const selectHandler = (opt, e) => {
        setSelected(e.target.textContent)
        setIsActive(false)
        handleUpdate(opt.value, selfIndex, parentIndex, opt.name)
    }

    useEffect(() => {
        setSelected(item)
    }, [item])

    useEffect(() => {
        if (itemList?.length > 3) setScrollFix(true)
        else if (selected.length > 10) setScrollFix(null)
    }, [itemList])

    return (
        <div
            tabIndex={2}
            onBlur={() => {
                setIsActive(false)
            }}
            className="dropdown"
        >
            <div
                style={{
                    padding: padding ? "0px" : "16px",
                    borderRadius: "8px"
                }}
                className="dropdown-btn"
                onClick={() => setIsActive(!isActive)}
            >
                <span
                    style={{
                        width: width
                            ? `${width}`
                            : `${selected.length > 10 && !padding
                                ? "125px"
                                : "70px"
                            }`
                    }}
                    className={width ? "" : "selected"}
                >
                    {selected}
                </span>
                <span className="flex items-end ">
                    {!isActive ? (
                        <svg
                            width={12}
                            height={8}
                            viewBox="0 0 12 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>{`This is dropdown icon`}</title>
                            <path
                                d="M1 1.5L6 6.5L11 1.5"
                                stroke="#334155"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    ) : (
                        <svg
                            width={12}
                            height={8}
                            viewBox="0 0 12 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>{`This is dropdown icon`}</title>
                            <path
                                d="M11 6.5L6 1.5L1 6.5"
                                stroke="#5C5C5C"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    )}
                </span>
            </div>
            {isActive && (
                <div
                    className="dropdown-content"
                    style={{
                        height:
                            scrollFix == true
                                ? itemList?.length < 5
                                    ? "auto"
                                    : "280px"
                                : scrollFix == null
                                    ? "auto"
                                    : "auto"
                    }}
                >
                    {itemList
                        ? itemList.map((opt, i) => (
                            <div
                                key={i}
                                className="dropdown-item"
                                onClick={(e) => selectHandler(opt, e)}
                            >
                                {opt.label}
                            </div>
                        ))
                        : options.map((opt, i) => (
                            <div
                                key={i}
                                className="dropdown-item"
                                onClick={(e) => selectHandler(opt, e)}
                            >
                                {opt}
                            </div>
                        ))}
                </div>
            )}
        </div>
    )
}
Dropdown.defaultProps = {
    width: false
}
export default Dropdown
