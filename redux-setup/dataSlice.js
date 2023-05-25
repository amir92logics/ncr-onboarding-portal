import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    sideBarData: [
        {
            name: "Actions",
            percentage: null,
            route: "/actions",
            subStages: null,
            display: true,
            data: []
        },
        {
            name: "Schedule",
            percentage: null,
            route: "/schedule",
            subStages: null,
            display: true,
            data: []
        },
        {
            name: "Discovery",
            percentage: 0,
            route: "#",
            data: [],
            display: true,
            systemrefresh: [
                {
                    name: "Discovery Overview",
                    percentage: null,
                    data: [],
                    route: "/discovery",
                    subStages: null
                },
                {
                    name: "Back Office Computer & Printer",
                    percentage: 0,
                    route: "/discovery/back-office-computer-&-printer/back-office-computer-&-printer",
                    subStages: [
                        {
                            name: "Back Office Computer & Printer",
                            percentage: 0,
                            data: [],
                            route: "/discovery/back-office-computer-&-printer/back-office-computer-&-printer",
                            subStages: null
                        },
                        {
                            name: "Confirmation",
                            percentage: null,
                            data: [],
                            route: "/discovery/back-office-computer-&-printer/confirmation",
                            subStages: null
                        }
                    ]
                },
                {
                    name: "Network",
                    percentage: 0,
                    route: "/discovery/network/internet-requirements",
                    subStages: [
                        {
                            name: "Electrical, Network Wiring, and Internet Requirements",
                            percentage: 0,
                            route: "/discovery/network/internet-requirements",
                            subStages: null,
                            data: []
                        },
                        {
                            name: "Network Management & Security",
                            percentage: 0,
                            route: "/discovery/network/site-network",
                            subStages: null,
                            data: []
                        },
                        {
                            name: "NCR Managed Network With NSS",
                            percentage: 0,
                            route: "/discovery/network/ncr-managed-network",
                            subStages: null,
                            data: []
                        },
                        {
                            name: "Networking Guidelines",
                            percentage: 0,
                            route: "/discovery/network/site-network-documentation",
                            subStages: null,
                            data: []
                        },
                        {
                            name: "Confirmation",
                            percentage: null,
                            route: "/discovery/network/network-confirmation",
                            subStages: null,
                            data: []
                        }
                    ]
                },
                {
                    name: "Integrations",
                    percentage: 0,
                    route: "/discovery/integrations/aloha-features",
                    subStages: [
                        {
                            name: "Aloha Essentials Features",
                            percentage: 0,
                            route: "/discovery/integrations/aloha-features",
                            subStages: null,
                            data: []
                        },
                        {
                            name: "Partnership & Integration",
                            percentage: 0,
                            route: "/discovery/integrations/partnerships-integrations",
                            subStages: null,
                            data: []
                        },
                        {
                            name: "Confirmation",
                            percentage: null,
                            route: "/discovery/integrations/integration-confirmation",
                            subStages: null,
                            data: []
                        }
                    ]
                }
            ],
            subStages: [
                {
                    name: "Discovery Overview",
                    percentage: null,
                    data: [],
                    route: "/discovery",
                    subStages: null
                },
                {
                    name: "Site Information",
                    percentage: 0,
                    route: "/discovery/site-information/hours-of-operation",

                    subStages: [
                        {
                            name: "Hours of Operation",
                            percentage: 0,
                            route: "/discovery/site-information/hours-of-operation",
                            subStages: null,
                            data: []
                        },
                        {
                            name: "Revenue Centers",
                            percentage: 0,
                            route: "/discovery/site-information/revenue-center",
                            subStages: null,
                            data: []
                        },
                        {
                            name: "Day Parts",
                            percentage: 0,
                            route: "/discovery/site-information/day-parts",
                            subStages: null,
                            data: []
                        },
                        {
                            name: "Confirmation",
                            percentage: null,
                            route: "/discovery/site-information/siteInformationConfirmation",
                            subStages: null,
                            data: []
                        }
                    ]
                },
                {
                    name: "Labor",
                    percentage: 0,
                    route: "/discovery/labor/payroll",
                    subStages: [
                        {
                            name: "Payroll",
                            percentage: 0,
                            route: "/discovery/labor/payroll",
                            subStages: null,
                            data: []
                        },
                        {
                            name: "Overtime",
                            percentage: 0,
                            route: "/discovery/labor/overtime",
                            subStages: null,
                            data: []
                        },
                        {
                            name: "Job Codes",
                            percentage: 0,
                            route: "/discovery/labor/jobcodes",
                            subStages: null,
                            data: []
                        },
                        {
                            name: "Confirmation",
                            percentage: null,
                            route: "/discovery/labor/labor-confirmation",
                            subStages: null,
                            data: []
                        }
                    ]
                },
                {
                    name: "Financial",
                    percentage: 0,
                    route: "/discovery/financial/tax-rates",
                    subStages: [
                        {
                            name: "Tax Rates",
                            percentage: 0,
                            route: "/discovery/financial/tax-rates",
                            subStages: null,
                            data: []
                        },
                        {
                            name: "Comps",
                            percentage: 0,
                            route: "/discovery/financial/comps",
                            subStages: null,
                            data: []
                        },
                        {
                            name: "Void Reasons",
                            percentage: 0,
                            route: "/discovery/financial/void-reasons",
                            subStages: null,
                            data: []
                        },
                        {
                            name: "Petty Cash",
                            percentage: 0,
                            route: "/discovery/financial/petty-cash",
                            subStages: null,
                            data: []
                        },
                        {
                            name: "Confirmation",
                            percentage: null,
                            route: "/discovery/financial/financial-confirmation",
                            subStages: null,
                            data: []
                        }
                    ]
                },
                {
                    name: "Reporting",
                    percentage: 0,
                    route: "/discovery/reporting/salesretailcatg",
                    subStages: [
                        {
                            name: "Sales and Retail Categories",
                            percentage: 0,
                            route: "/discovery/reporting/salesretailcatg",
                            subStages: null,
                            data: []
                        },
                        {
                            name: "General Categories",
                            percentage: 0,
                            route: "/discovery/reporting/generalcatg",
                            subStages: null,
                            data: []
                        },
                        {
                            name: "Confirmation",
                            percentage: null,
                            route: "/discovery/reporting/reporting-confirmation",
                            subStages: null,
                            data: []
                        }
                    ]
                },
                {
                    name: "Operations",
                    percentage: 0,
                    route: "/discovery/operations/ordering-process",
                    subStages: [
                        {
                            name: "Ordering Process",
                            percentage: 0,
                            route: "/discovery/operations/ordering-process",
                            subStages: null,
                            data: []
                        },
                        {
                            name: "Prep Printer Names",
                            percentage: 0,
                            route: "/discovery/operations/printer-names",
                            subStages: null,
                            data: []
                        },
                        {
                            name: "Printer Groups",
                            percentage: 0,
                            route: "/discovery/operations/printer-groups",
                            subStages: null,
                            data: []
                        },
                        {
                            name: "Printer Routing",
                            percentage: 0,
                            route: "/discovery/operations/printer-routing",
                            subStages: null,
                            data: []
                        },
                        {
                            name: "Confirmation",
                            percentage: null,
                            route: "/discovery/operations/operation-confirmation",
                            subStages: null,
                            data: []
                        }
                    ]
                },
                {
                    name: "Network",
                    percentage: 0,
                    route: "/discovery/network/internet-requirements",
                    subStages: [
                        {
                            name: "Electrical, Network Wiring, and Internet Requirements",
                            percentage: 0,
                            route: "/discovery/network/internet-requirements",
                            subStages: null,
                            data: []
                        },
                        {
                            name: "Network Management & Security",
                            percentage: 0,
                            route: "/discovery/network/site-network",
                            subStages: null,
                            data: []
                        },
                        {
                            name: "NCR Managed Network With NSS",
                            percentage: 0,
                            route: "/discovery/network/ncr-managed-network",
                            subStages: null,
                            data: []
                        },
                        {
                            name: "Networking Guidelines",
                            percentage: 0,
                            route: "/discovery/network/site-network-documentation",
                            subStages: null,
                            data: []
                        },
                        {
                            name: "Confirmation",
                            percentage: null,
                            route: "/discovery/network/network-confirmation",
                            subStages: null,
                            data: []
                        }
                    ]
                },
                {
                    name: "Integrations",
                    percentage: 0,
                    route: "/discovery/integrations/aloha-features",
                    subStages: [
                        {
                            name: "Aloha Essentials Features",
                            percentage: 0,
                            route: "/discovery/integrations/aloha-features",
                            subStages: null,
                            data: []
                        },
                        {
                            name: "Partnership & Integration",
                            percentage: 0,
                            route: "/discovery/integrations/partnerships-integrations",
                            subStages: null,
                            data: []
                        },
                        {
                            name: "Confirmation",
                            percentage: null,
                            route: "/discovery/integrations/integration-confirmation",
                            subStages: null,
                            data: []
                        }
                    ]
                }
            ]
        },
        {
            name: "Documents",
            percentage: 0,
            data: [],
            display: true,
            route: "#",
            subStages: [
                {
                    name: "Documents Overview",
                    percentage: null,
                    route: "/documents",
                    subStages: null
                },
                {
                    name: "Menu",
                    type: "menu_upload_filename",
                    percentage: null,
                    route: "/documents/menu",
                    subStages: null
                },
                {
                    name: "Floor Plan",
                    percentage: null,
                    type: "floor_plan_upload_filename",

                    route: "/documents/floor-plan",
                    subStages: null
                },
                {
                    name: "Credit Card VAR",
                    percentage: null,
                    type: "credit_card_upload_filename",
                    route: "/documents/credit-card",
                    subStages: null
                },
                {
                    name: "Wireless Solution - Restaurant Blueprints",
                    type: "wireless_upload_filename",
                    percentage: null,
                    route: "/documents/wireless-solution",
                    subStages: null
                }
            ]
        },
        {
            name: "Contacts",
            percentage: 0,
            route: "/contacts/propertyexpert",
            display: false,
            subStages: [
                {
                    name: "Property Experts",
                    percentage: 0,
                    route: "/contacts/propertyexpert",
                    subStages: null,
                    data: []
                },
                {
                    name: "Key Contact Information",
                    percentage: 0,
                    route: "/contacts/othercontact",
                    subStages: null,
                    data: []
                },
                {
                    name: "Confirmation",
                    percentage: null,
                    route: "/contacts/confirmation",
                    subStages: null,
                    data: []
                }
            ]
        },

        {
            name: "Project Sign Off",
            percentage: 0,
            route: "/project-sign-off",
            subStages: null,
            data: [
                {
                    installDate: "",
                    taskData: null
                }
            ],
            display: true
        }
    ],

    workflows: [],
    rightPanelBar: false,
    rightNotificationBar: false,
    includedRevenueData: [
        {
            includedComps: "Bar Comp",
            compsType: "Percent Discount",
            amountDeducted: ""
        },
        {
            includedComps: "Bar Mistake",
            compsType: "Percent Discount",
            amountDeducted: ""
        },
        {
            includedComps: "Kitchen Mistake",
            compsType: "Percent Discount",
            amountDeducted: ""
        },
        {
            includedComps: "Server Mistake",
            compsType: "Percent Discount",
            amountDeducted: ""
        },
        {
            includedComps: "Cashier Error",
            compsType: "Percent Discount",
            amountDeducted: ""
        },
        {
            includedComps: "Emp $ Discount",
            compsType: "Prompt for % Off",
            amountDeducted: "Prompt for % Off"
        },
        {
            includedComps: "Emp % Discount",
            compsType: "Prompt for % Off",
            amountDeducted: "Prompt for % Off"
        },
        {
            includedComps: "Employee Meal",
            compsType: "Percent Discount",
            amountDeducted: ""
        },
        {
            includedComps: "Friends & Family",
            compsType: "Percent Discount",
            amountDeducted: ""
        },
        {
            includedComps: "Guest Satisfaction",
            compsType: "Prompt for % Off",
            amountDeducted: "Prompt for % Off"
        },
        {
            includedComps: "Manager Discretion",
            compsType: "Percent Discount",
            amountDeducted: ""
        },
        {
            includedComps: "Manager Meal",
            compsType: "Percent Discount",
            amountDeducted: ""
        },
        {
            includedComps: "Manager %",
            compsType: "Prompt for % Off",
            amountDeducted: "Prompt for % Off"
        },
        {
            includedComps: "Manager $",
            compsType: "Prompt for % Off",
            amountDeducted: "Prompt for % Off"
        },
        {
            includedComps: "Gift Card Comp",
            compsType: "Percent Discount",
            amountDeducted: ""
        }
    ],
    tableData: [],
    ncrManagedNetwork: true,
    readonlycheckbox: false,
    homepagesidebar: [
        {
            name: "Overview",
            svg: (
                <svg
                    width={18}
                    height={18}
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>This is Overview icon</title>
                    <path
                        d="M9.41654 7.33411C9.41654 5.95911 8.29154 4.83411 6.91654 4.83411C5.54154 4.83411 4.41654 5.95911 4.41654 7.33411C4.41654 8.70912 5.54154 9.83412 6.91654 9.83412C8.29154 9.83412 9.41654 8.70912 9.41654 7.33411ZM6.91654 8.16745C6.4582 8.16745 6.0832 7.79245 6.0832 7.33411C6.0832 6.87578 6.4582 6.50078 6.91654 6.50078C7.37487 6.50078 7.74987 6.87578 7.74987 7.33411C7.74987 7.79245 7.37487 8.16745 6.91654 8.16745ZM12.3332 9.83412C13.2582 9.83412 13.9999 9.09245 13.9999 8.16745C13.9999 7.24245 13.2582 6.50078 12.3332 6.50078C11.4082 6.50078 10.6582 7.24245 10.6665 8.16745C10.6665 9.09245 11.4082 9.83412 12.3332 9.83412ZM8.99154 0.675781C4.39154 0.675781 0.658203 4.40911 0.658203 9.00912C0.658203 13.6091 4.39154 17.3424 8.99154 17.3424C13.5915 17.3424 17.3249 13.6091 17.3249 9.00912C17.3249 4.40911 13.5915 0.675781 8.99154 0.675781ZM3.86654 13.2674C4.4332 12.8174 5.7582 12.3424 6.91654 12.3424C6.97487 12.3424 7.04154 12.3508 7.1082 12.3508C7.3082 11.8174 7.66654 11.2758 8.19154 10.8008C7.72487 10.7174 7.2832 10.6674 6.91654 10.6674C5.8332 10.6674 4.09154 11.0424 2.97487 11.8591C2.5582 10.9924 2.32487 10.0258 2.32487 9.00078C2.32487 5.32578 5.31654 2.33411 8.99154 2.33411C12.6665 2.33411 15.6582 5.32578 15.6582 9.00078C15.6582 10.0008 15.4332 10.9508 15.0332 11.8091C14.1999 11.3174 13.0665 11.0841 12.3332 11.0841C11.0665 11.0841 8.5832 11.7591 8.5832 13.3341V15.6508C6.69154 15.5424 5.0082 14.6424 3.86654 13.2674Z"
                        fill="currentColor"
                    />
                </svg>
            ),

            subStages: null
        },
        {
            name: "Projects",
            svg: (
                <svg
                    width={16}
                    height={14}
                    viewBox="0 0 16 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>This is Projects icon</title>

                    <path
                        d="M1.33203 5.75C0.640365 5.75 0.0820312 6.30833 0.0820312 7C0.0820312 7.69167 0.640365 8.25 1.33203 8.25C2.0237 8.25 2.58203 7.69167 2.58203 7C2.58203 6.30833 2.0237 5.75 1.33203 5.75ZM1.33203 0.75C0.640365 0.75 0.0820312 1.30833 0.0820312 2C0.0820312 2.69167 0.640365 3.25 1.33203 3.25C2.0237 3.25 2.58203 2.69167 2.58203 2C2.58203 1.30833 2.0237 0.75 1.33203 0.75ZM1.33203 10.75C0.640365 10.75 0.0820312 11.3167 0.0820312 12C0.0820312 12.6833 0.648698 13.25 1.33203 13.25C2.01536 13.25 2.58203 12.6833 2.58203 12C2.58203 11.3167 2.0237 10.75 1.33203 10.75ZM3.83203 12.8333H15.4987V11.1667H3.83203V12.8333ZM3.83203 7.83333H15.4987V6.16667H3.83203V7.83333ZM3.83203 1.16667V2.83333H15.4987V1.16667H3.83203Z"
                        fill="currentColor"
                    />
                </svg>
            ),

            subStages: []
        }
    ],
    currentproject: {},
    apiloadingstate: true,
    tasks: [],
    discoveryLoading: true,
    modalStoreData: {
        open: false,
        data: []
    },
    sidebarToggle: false,
    notifications: [],
    projectType: false,
    EmptySiteReadinessData: [
        {
            id: "1",
            title: "Electrical",
            submitted: false,
            options: [
                {
                    checked: false,
                    value: `All electrical circuits are dedicated, isolated, and grounded.`,
                    key: "1"
                },
                {
                    checked: false,
                    value: `All <b id="outlets">outlets</b> have been tested to provide 110 to 120 volts of power. `,
                    key: "2"
                },
                {
                    checked: false,
                    value: "There is a duplex (2 plugs) at each terminal or kitchen station.",
                    key: "3"
                },
                {
                    checked: false,
                    value: "Each prep printer station has a simplex outlet (1 plug) or duplex outlet (2 plugs).",
                    key: "4"
                },
                {
                    checked: false,
                    value: "There is a quad outlet and duplex outlet (6 plugs) at the file server location.",
                    key: "5"
                }
            ]
        },
        {
            id: "2",
            title: "Network Wiring",
            submitted: false,
            options: [
                {
                    checked: false,
                    value: "There are two data RJ45 Ethernet jacks per terminal (unless the Project Lead specifies more).",
                    key: "6"
                },
                {
                    checked: false,
                    value: `There is one <a href='javascript:void(0)' id='data-jack'>data jack</a>  per prep printer and kitchen display.`,
                    key: "7"
                },
                {
                    checked: false,
                    value: "All data lines are terminated, connected to a <a href='javascript:void(0)' >patch panel</a>, and labeled.",
                    key: "8"
                },
                {
                    checked: false,
                    value: "<a href='javascript:void(0)'  >Holes</a> have been drilled to allow ease of access to all data and power connection points on the equipment. There are no obstructions by other furniture or devices. All mounting brackets will be professionally installed prior to the installation.",
                    key: "9"
                }
            ]
        },
        {
            id: "3",
            title: "Internet",
            submitted: false,
            options: [
                {
                    checked: false,
                    value: "Fiber, cable, or DSL high-speed Internet (25 Mbps download / 5 Mbps upload minimum) is available.",
                    key: "11"
                }
            ]
        },
        {
            id: "4",
            title: "Shelving, Cabinetry, Surface",
            submitted: false,
            options: [
                {
                    checked: false,
                    value: "All the locations for the POS system have a stable, flat surface to have equipment placed.",
                    key: "12"
                },
                {
                    checked: false,
                    value: "Holes have been drilled to allow for access for cables to the equipment",
                    key: "13"
                },
                {
                    checked: false,
                    value: "All mounting brackets will be installed by a contractor prior to install. (NCR will provide mounting hardware prior to that install)",
                    key: "14"
                }
            ]
        },
        {
            id: "5",
            submitted: false
        }
    ],
    menuProgramingSignature: {},
    installDate: {},
    subTasks: []
}

const dataSlice = createSlice({
    name: "dataSlice",
    initialState,
    reducers: {
        setModalStoreData: (state, action) => {
            state.modalStoreData = action.payload
        },
        setWorkFlows: (state, action) => {
            state.workflows = action.payload
        },
        setTabledata: (state, action) => {
            state.tableData = action.payload
        },
        toggleRightBar: (state, action) => {
            state.rightPanelBar = action.payload
        },
        toggleNotifications: (state, action) => {
            state.rightNotificationBar = action.payload
        },
        SetSideBarData: (state, action) => {
            state.sideBarData = action.payload
        },
        SetIncludedRevenueData: (state, action) => {
            state.includedRevenueData = action.payload
        },
        SetNcrManagedNetwork: (state, action) => {
            state.ncrManagedNetwork = action.payload
        },
        SetReadOnlyCheckBox: (state, action) => {
            state.readonlycheckbox = action.payload
        },
        setCurrentproject: (state, action) => {
            state.currentproject = action.payload
        },
        SetApiloadingState: (state, action) => {
            state.apiloadingstate = action.payload
        },
        setDiscoveryLoading: (state, action) => {
            state.discoveryLoading = action.payload
        },
        SetTasks: (state, action) => {
            state.tasks = action.payload
        },
        SetSubTasks: (state, action) => {
            state.subTasks = action.payload
        },
        setSidebarToggle: (state, action) => {
            state.sidebarToggle = action.payload
            action.payload
                ? (document.body.style.overflow = "hidden")
                : (document.body.style.overflow = "initial")
        },
        setNotifications: (state, action) => {
            state.notifications = action.payload
        },
        setProjectType: (state, action) => {
            state.projectType = action.payload
        },
        setEmptySiteReadinessData: (state, action) => {
            state.EmptySiteReadinessData = action.payload
        },
        setMenuProgramingSignature: (state, action) => {
            state.menuProgramingSignature = action.payload
        },
        setInstalldatedata: (state, action) => {
            state.installDate = action.payload
        },
        reset: (state, action) => {
            state.sideBarData = initialState.sideBarData
            state.EmptySiteReadinessData = initialState.EmptySiteReadinessData
            state.menuProgramingSignature = initialState.menuProgramingSignature
            state.installDate = initialState.installDate
            state.currentproject = initialState.currentproject
            state.projectType = initialState.projectType
            state.discoveryLoading = initialState.discoveryLoading
            state.apiloadingstate = initialState.apiloadingstate
            state.tasks = initialState.tasks
            state.subTasks = initialState.subTasks
            state.tableData = []
            state.ncrManagedNetwork = initialState.ncrManagedNetwork
        }
    }
})
export const {
    reset,
    SetSubTasks,
    setProjectType,
    setInstalldatedata,
    setNotifications,
    setMenuProgramingSignature,
    setSidebarToggle,
    setModalStoreData,
    SetTasks,
    setWorkFlows,
    setDiscoveryLoading,
    setTabledata,
    toggleRightBar,
    toggleNotifications,
    SetSideBarData,
    SetNcrManagedNetwork,
    SetReadOnlyCheckBox,
    setCurrentproject,
    SetApiloadingState,
    setEmptySiteReadinessData
} = dataSlice.actions
export default dataSlice.reducer
