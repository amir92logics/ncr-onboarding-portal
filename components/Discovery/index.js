import { Grid, Skeleton, Typography } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import { useSelector } from "react-redux"
import theme from "../../src/theme"
import { ProjectOverAllProgress } from "../LayoutBase/ProjectOverAllProgress"
import CommonButton from "../common/CommonButton"
import { useRouter } from "next/router"
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined"
import { OverViewStatusChip } from "../common/CustomStatusChip"
const Discovery = () => {
    const subTasks = useSelector((state) => state.dataSlice.subTasks)
    const apiloadingstate=useSelector(state=>state.dataSlice.apiloadingstate)
    const router = useRouter()
    const pid = router.query.id
    const onClickNextStep = (name) => {
        router.push({
            pathname: `${routes[name]}/${pid}`,
            query: { inner: true }
        })
    }
    const discription = {
        "Site Information":
            "Please provide us details around your store’s hours of operation",
        "Back Office Computer & Printer": `This information will help us install and configure your back office computer & Printer.`,
        Network:
            "Please provide us details around your store’s network setup and review NCR’s requirements",
        Integrations:
            "Please provide us details around the Aloha Features you will be utilizing and any partnerships ",
        Labor: "Please provide us details around your store’s payroll data, labor wages, overtime rates and job codes ",
        Financial:
            "Please provide us details around your store’s tax rates, comps, voids, and restaurant expense accounts ",
        Reporting:
            "Please provide us details around your store’s reporting categories ",
        Operations:
            "Please provide us details around your store’s ordering process and print routing requirements "
    }
    const svg = {
        "Back Office Computer & Printer": (
            <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>This is Back Office Computer & Printer icon</title>
                <rect width={24} height={24} rx={12} fill="#E8EEFF" />
                <path
                    d="M20 18C21.1 18 21.99 17.1 21.99 16L22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V16C2 17.1 2.9 18 4 18H0V20H24V18H20ZM4 6H20V16H4V6Z"
                    fill="#1E1E1E"
                />
            </svg>
        ),
        Network: (
            <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
            <title>This is Network icon</title>
                <g clipPath="url(#clip0_1554_139531)">
                    <rect width={24} height={24} rx={12} fill="#E8EEFF" />
                    <path
                        d="M1 8.99977L3 10.9998C7.97 6.02977 16.03 6.02977 21 10.9998L23 8.99977C16.93 2.92977 7.08 2.92977 1 8.99977ZM9 16.9998L12 19.9998L15 16.9998C13.35 15.3398 10.66 15.3398 9 16.9998ZM5 12.9998L7 14.9998C9.76 12.2398 14.24 12.2398 17 14.9998L19 12.9998C15.14 9.13977 8.87 9.13977 5 12.9998Z"
                        fill="#1E1E1E"
                    />
                </g>
                <defs>
                    <clipPath >
                        <rect width={24} height={24} rx={12} fill="white" />
                    </clipPath>
                </defs>
            </svg>
        ),
        Integrations: (
            <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>This is Integrations icon</title>
                <rect width={24} height={24} rx={12} fill="#E8EEFF" />
                <path
                    d="M22 11V3H15V6H9V3H2V11H9V8H11V18H15V21H22V13H15V16H13V8H15V11H22ZM7 9H4V5H7V9ZM17 15H20V19H17V15ZM17 5H20V9H17V5Z"
                    fill="#1E1E1E"
                />
            </svg>
        ),
        "Site Information": (
            <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>This is Site Information icon</title>
                <rect width={24} height={24} rx={12} fill="#E8EEFF" />
                <path
                    d="M12 7V3H2V21H22V7H12ZM6 19H4V17H6V19ZM6 15H4V13H6V15ZM6 11H4V9H6V11ZM6 7H4V5H6V7ZM10 19H8V17H10V19ZM10 15H8V13H10V15ZM10 11H8V9H10V11ZM10 7H8V5H10V7ZM20 19H12V17H14V15H12V13H14V11H12V9H20V19ZM18 11H16V13H18V11ZM18 15H16V17H18V15Z"
                    fill="#1E1E1E"
                />
            </svg>
        ),
        Labor: (
            <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>This is Labor icon</title>
                <rect width={24} height={24} rx={12} fill="#E8EEFF" />
                <path
                    d="M11 14.1702L8.83 12.0002L11 9.83016L9.59 8.41016L6 12.0002L9.59 15.5902L11 14.1702Z"
                    fill="#1E1E1E"
                />
                <path
                    d="M14.41 15.5902L18 12.0002L14.41 8.41016L13 9.83016L15.17 12.0002L13 14.1702L14.41 15.5902Z"
                    fill="#1E1E1E"
                />
                <path
                    d="M19 3H14.82C14.4 1.84 13.3 1 12 1C10.7 1 9.6 1.84 9.18 3H5C4.86 3 4.73 3.01 4.6 3.04C4.21 3.12 3.86 3.32 3.59 3.59C3.41 3.77 3.26 3.99 3.16 4.23C3.06 4.46 3 4.72 3 5V15V16V19C3 19.27 3.06 19.54 3.16 19.78C3.26 20.02 3.41 20.23 3.59 20.42C3.86 20.69 4.21 20.89 4.6 20.97C4.73 20.99 4.86 21 5 21H19C20.1 21 21 20.1 21 19V16V15V5C21 3.9 20.1 3 19 3ZM12 2.75C12.41 2.75 12.75 3.09 12.75 3.5C12.75 3.91 12.41 4.25 12 4.25C11.59 4.25 11.25 3.91 11.25 3.5C11.25 3.09 11.59 2.75 12 2.75ZM19 15V16V19H5V16V15V5H19V15Z"
                    fill="#1E1E1E"
                />
            </svg>
        ),
        Reporting: (
            <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>This is Reporting icon</title>
                <rect width={24} height={24} rx={12} fill="#E8EEFF" />
                <path
                    d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM7 10H9V17H7V10ZM11 7H13V17H11V7ZM15 13H17V17H15V13Z"
                    fill="#1E1E1E"
                />
            </svg>
        ),
        Financial: (
            <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>This is Financial icon</title>
                <rect width={24} height={24} rx={12} fill="#E8EEFF" />
                <path
                    d="M13.17 4L18 8.83V20H6V4H13.17ZM14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM15 11H11V12H14C14.55 12 15 12.45 15 13V16C15 16.55 14.55 17 14 17H13V18H11V17H9V15H13V14H10C9.45 14 9 13.55 9 13V10C9 9.45 9.45 9 10 9H11V8H13V9H15V11Z"
                    fill="#1E1E1E"
                />
            </svg>
        ),
        Operations: (
            <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>This is Operations icon</title>
                <g clipPath="url(#clip0_1554_139521)">
                    <rect width={24} height={24} rx={12} fill="#E8EEFF" />
                    <path
                        d="M19 8H18V3H6V8H5C3.34 8 2 9.34 2 11V17H6V21H18V17H22V11C22 9.34 20.66 8 19 8ZM8 5H16V8H8V5ZM16 19H8V15H16V19ZM18 15V13H6V15H4V11C4 10.45 4.45 10 5 10H19C19.55 10 20 10.45 20 11V15H18Z"
                        fill="#1E1E1E"
                    />
                    <path
                        d="M18 12.5C18.5523 12.5 19 12.0523 19 11.5C19 10.9477 18.5523 10.5 18 10.5C17.4477 10.5 17 10.9477 17 11.5C17 12.0523 17.4477 12.5 18 12.5Z"
                        fill="#1E1E1E"
                    />
                </g>
                <defs>
                    <clipPath >
                        <rect width={24} height={24} rx={12} fill="white" />
                    </clipPath>
                </defs>
            </svg>
        )
    }
    const routes = {
        "Back Office Computer & Printer": `/discovery/back-office-computer-&-printer/back-office-computer-&-printer`,
        "Site Information": "/discovery/site-information/hours-of-operation",
        Network: "/discovery/network/internet-requirements",
        Integrations: "/discovery/integrations/aloha-features",
        Labor: "/discovery/labor/payroll",
        Financial: "/discovery/financial/tax-rates",
        Reporting: "/discovery/reporting/salesretailcatg",
        Operations: "/discovery/operations/ordering-process"
    }
    return (
        <Box
            sx={{
                display: "grid",
                gap: 4,
                mb: 6,
                gridTemplateColumns: {
                    xs: "repeat(1, minmax(0, 1fr))",
                    md: "repeat(2, minmax(0, 1fr))"
                }
            }}
        >
            {apiloadingstate
                ? [1, 2, 3].map((it) => (
                      <Skeleton
                          key={it}
                          variant="rectangular"
                          sx={{ borderRadius: 3 }}
                          width={"100%"}
                          height={252}
                      />
                  ))
                : subTasks.map((sub, ind) => (
                      <React.Fragment key={`${sub.display_name + ind}`}>
                          {sub.display_name !== "Discovery Overview" && (
                              <Grid
                                  item
                                  className="shadow"
                                  sx={{
                                      minHeight: { md: "246px" },
                                      display: "flex",
                                      borderRadius: 3,
                                      position: "relative",
                                      background: "#fff",
                                      p: 6,
                                      width: "100%"
                                  }}
                              >
                                  <Box
                                      display="flex"
                                      flexDirection="column"
                                      justifyContent="space-between"
                                      width="100%"
                                  >
                                      <Box>
                                          <Typography
                                              sx={{
                                                  fontSize: theme.fontsize.lg,
                                                  fontWeight: 600,
                                                  lineHeight: "28px",
                                                  color: theme.palette.textColor
                                                      .main,
                                                  display: "flex",
                                                  alignItems: "flex-start",
                                                  gap: 3,
                                                  mb: 2
                                              }}
                                          >
                                              <Box
                                                  component={"span"}
                                                  sx={{
                                                      mt: { xs: 0.5, md: 0 }
                                                  }}
                                              >
                                                  {svg[sub.display_name]}
                                              </Box>
                                              <Box component={"span"}>
                                                  {sub.display_name}
                                              </Box>
                                          </Typography>

                                          <Typography
                                              sx={{
                                                  mb: {
                                                      xl: ind !== 1 && 0,
                                                      xs: 6
                                                  },
                                                  fontSize: theme.fontsize.base,
                                                  lineHeight: "24px",

                                                  color: theme.palette.secondary
                                                      .main
                                              }}
                                          >
                                              {discription[sub.display_name]}
                                          </Typography>
                                      </Box>
                                      <Box>
                                          <ProjectOverAllProgress
                                              width={"100%"}
                                              bgcolor={
                                                  sub.percent_complete == 0 &&
                                                  "#EEEEEE"
                                              }
                                              title={"Progress "}
                                              percentage={sub.percent_complete}
                                          />
                                          <Box
                                              sx={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                  justifyContent:
                                                      "space-between",
                                                  mt: 6
                                              }}
                                          >
                                              {sub.percent_complete == 100 ? (
                                                  <OverViewStatusChip
                                                      fontSize={"16px"}
                                                      lineHeight={"24px"}
                                                      status={"completed"}
                                                      label={"completed"}
                                                  />
                                              ) : sub.percent_complete == 0 ? (
                                                  <Typography
                                                      sx={{
                                                          fontSize:
                                                              theme.fontsize
                                                                  .base,
                                                          display: "flex",
                                                          alignItems: "center",
                                                          gap: 1,
                                                          maxWidth:
                                                              "max-content",
                                                          background: "#F5F5F5",
                                                          px: 2,
                                                          color: theme.palette
                                                              .secondary.main,

                                                          borderRadius: 6,
                                                          py: 1.5
                                                      }}
                                                  >
                                                      <ContactSupportOutlinedIcon
                                                          sx={{
                                                              color: "#757575",
                                                              fontSize: "24px"
                                                          }}
                                                      />{" "}
                                                      <Box
                                                          sx={{
                                                              fontSize: "16px"
                                                          }}
                                                          component={"span"}
                                                      >
                                                          Not Started
                                                      </Box>
                                                  </Typography>
                                              ) : (
                                                  <OverViewStatusChip
                                                      fontSize={"16px"}
                                                      lineHeight={"24px"}
                                                      status={"in progress"}
                                                      label={"in progress"}
                                                  />
                                              )}
                                              <CommonButton
                                                  hover={
                                                      sub.percent_complete ==
                                                      100
                                                          ? "#F5FAF5"
                                                          : "#F5F6FF"
                                                  }
                                                  ariaTag={`This is ${
                                                      sub.percent_complete ==
                                                      100
                                                          ? "View"
                                                          : "Edit"
                                                  } Button`}
                                                  textTransform="capitalize"
                                                  svgicon={
                                                      <svg
                                                          width={20}
                                                          height={20}
                                                          viewBox="0 0 20 20"
                                                          fill="none"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                      >
                                                        <title>This is back button icon</title>
                                                          <g clipPath="url(#clip0_836_22040)">
                                                              <path
                                                                  d="M7.86492 6.17539L8.3332 5.70711L12.6261 10L8.3332 14.2929L7.86492 13.8246L11.3288 10.3532L11.6812 10L11.3288 9.64683L7.86492 6.17539Z"
                                                                  fill="currentColor"
                                                                  stroke="currentColor"
                                                              />
                                                          </g>
                                                          <defs>
                                                              <clipPath>
                                                                  <rect
                                                                      width={20}
                                                                      height={
                                                                          20
                                                                      }
                                                                      fill="white"
                                                                  />
                                                              </clipPath>
                                                          </defs>
                                                      </svg>
                                                  }
                                                  onclickHandler={() =>
                                                      onClickNextStep(
                                                          sub.display_name
                                                      )
                                                  }
                                                  variant={"text"}
                                                  textColor={
                                                      sub.percent_complete ==
                                                      100
                                                          ? "#4CAF50"
                                                          : "#1D4ED8"
                                                  }
                                                  fontSize="14px"
                                                  fontWeight={600}
                                                  lineHeight="22px"
                                                  content={
                                                      sub.percent_complete ==
                                                      100
                                                          ? " View "
                                                          : "Edit"
                                                  }
                                              />
                                          </Box>
                                      </Box>
                                  </Box>
                              </Grid>
                          )}
                      </React.Fragment>
                  ))}
        </Box>
    )
}

export default Discovery
