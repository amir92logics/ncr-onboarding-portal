import moment from "moment"

export const get24Hours = () => {
    let arr = []
    for (let index = 0; index < 24; index++) {
        if (index >= 12) {
            let obj = {
                label: `${index - 11}:00 AM`,
                value: `${index - 11}:00 AM`
            }
            arr.push(obj)
        } else {
            let obj = {
                label: `${index + 1}:00 PM`,
                value: `${index + 1}:00 PM`
            }
            arr.push(obj)
        }
    }

    return arr
}

export const getSidebarMainStageIndex = (data, name) => {
    const tempIndex = data.findIndex((it) => it.name)
    return tempIndex
}
export const getDiscoveryMainStage = (data, name) => {
    const discoveryIndex = getSidebarMainStageIndex(data, "Discovery")

    let temp = [...data[discoveryIndex].subStages]
    const tempIndex = temp.findIndex((it) => it.name == name)
    return tempIndex
}
export const getDiscoverySubStage = (data, name, inner, refresh) => {
    let tempsidebar = [...data]
    let discoveryindex = tempsidebar.findIndex((it) => it.name == "Discovery")
    let discoverydata = { ...tempsidebar[discoveryindex] }
    let discoverysubstages = refresh
        ? [...discoverydata.systemrefresh]
        : [...discoverydata.subStages]
    let substageindex = discoverysubstages.findIndex((it) => it.name == name)
    let substagedata = { ...discoverysubstages[substageindex] }
    let substageinnerstages = [...substagedata.subStages]
    let currentindex = substageinnerstages.findIndex((it) => it.name == inner)
    return {
        substageinnerstages,
        substageper: substagedata.percentage,
        currentindex
    }
}

export const dispatchDiscoveryData = (
    data,
    name,
    inner,
    updatedData,
    percentage,
    innerstageper,
    discoverydataper,
    system
) => {
    let tempsidebar = [...data]
    let discoveryindex = tempsidebar.findIndex((it) => it.name == "Discovery")
    let discoverydata = { ...tempsidebar[discoveryindex] }
    let discoverysubstages = system
        ? [...discoverydata.systemrefresh]
        : [...discoverydata.subStages]
    let substageindex = discoverysubstages.findIndex((it) => it.name == name)
    let substagedata = { ...discoverysubstages[substageindex] }
    let substageinnerstages = [...substagedata.subStages]
    let currentindex = substageinnerstages.findIndex((it) => it.name == inner)
    let currentData = { ...substageinnerstages[currentindex] }
    currentData.data = updatedData
    currentData.percentage = percentage
    substageinnerstages[currentindex] = currentData
    substagedata.percentage = Math.round(innerstageper)
    substagedata.subStages = substageinnerstages
    discoverysubstages[substageindex] = substagedata
    discoverydata[system ? "systemrefresh" : "subStages"] = discoverysubstages
    discoverydataper &&
        (discoverydata.percentage = Math.round(discoverydataper))
    tempsidebar[discoveryindex] = discoverydata
    return tempsidebar
}
export const calculatePercentage = (TotalFields, filledFields) => {
    const percentage = (filledFields / TotalFields) * 100
    return Math.round(percentage)
}

export const getMessage = () => {
    const date = new Date()
    const currentTime = date.getHours()
    let greeting
    if (currentTime >= 4 && currentTime < 12) {
        greeting = "Good Morning"
    } else if (currentTime >= 12 && currentTime < 17) {
        greeting = "Good Afternoon"
    } else {
        greeting = "Good Evening"
    }
    return greeting
}

export const unixDateConverter = (date, format) => {
    return moment(moment.utc(moment.unix(date)).utcOffset(0)).format(format)
}
