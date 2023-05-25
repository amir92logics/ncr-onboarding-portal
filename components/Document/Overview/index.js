import React from "react"
import Box from "@mui/material/Box"
import { Button, Grid, Skeleton, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"
import theme from "../../../src/theme"
import CommonButton from "../../common/CommonButton"
import Image from "next/image"
export default function RequiredDocuments() {
    const sideBarData = useSelector((state) => state.dataSlice.sideBarData)
    const discoveryloading = useSelector(
        (state) => state.dataSlice.discoveryLoading
    )
    const tasks = useSelector((state) => state.dataSlice.tasks)
    const router = useRouter()
    const pid = router.query.id
    const onClickNextStep = (name) => {
        router.push({
            pathname: `${routes[name]}/${pid}`
        })
    }
    const documents = sideBarData.find((it) => it.name == "Documents")
    const docsnumber = (e) => {
        let current = documents.data.filter((it) => it.type == e).length
        return current
    }
    const filename = {
        "Credit Card VAR": "VAR",
        "Floor Plan": "Floor Plan",
        Menu: "Menu",
        "Wireless Solution - Restaurant Blueprints": "Wireless Solution"
    }
    const routes = {
        "Credit Card VAR": "/documents/credit-card",
        "Floor Plan": "/documents/floor-plan",
        Menu: "/documents/menu",
        "Wireless Solution - Restaurant Blueprints":
            "/documents/wireless-solution"
    }
    const fileroute = {
        "Credit Card VAR":
            "https://ncrsyncengine.blob.core.windows.net/ncr-sync-cdn/Credit%20Card%20VAR.png",
        "Floor Plan":
            "https://ncrsyncengine.blob.core.windows.net/ncr-sync-cdn/Floor%20Plan.png",
        Menu: "https://ncrsyncengine.blob.core.windows.net/ncr-sync-cdn/Menu.zip",
        "Wireless Solution - Restaurant Blueprints":
            "https://ncrsyncengine.blob.core.windows.net/ncr-sync-cdn/Sample_Blueprints.docx"
    }
    const svg = {
        "Credit Card VAR": (
            <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>This is credit card var icon</title>
                <rect width={24} height={24} rx={12} fill="#E8EEFF" />
                <path
                    d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 18H4V12H20V18ZM20 8H4V6H20V8Z"
                    fill="#1E1E1E"
                />
            </svg>
        ),
        "Floor Plan": (
            <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>This is floor plan icon</title>
                <rect width={24} height={24} rx={12} fill="#E8EEFF" />
                <path
                    d="M20.5 3L20.34 3.03L15 5.1L9 3L3.36 4.9C3.15 4.97 3 5.15 3 5.38V20.5C3 20.78 3.22 21 3.5 21L3.66 20.97L9 18.9L15 21L20.64 19.1C20.85 19.03 21 18.85 21 18.62V3.5C21 3.22 20.78 3 20.5 3ZM10 5.47L14 6.87V18.53L10 17.13V5.47ZM5 6.46L8 5.45V17.15L5 18.31V6.46ZM19 17.54L16 18.55V6.86L19 5.7V17.54Z"
                    fill="#1E1E1E"
                />
            </svg>
        ),
        Menu: (
            <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>This is menu icon</title>
                <rect width={24} height={24} rx={12} fill="#E8EEFF" />
                <path
                    d="M21 5C19.89 4.65 18.67 4.5 17.5 4.5C15.55 4.5 13.45 4.9 12 6C10.55 4.9 8.45 4.5 6.5 4.5C4.55 4.5 2.45 4.9 1 6V20.65C1 20.9 1.25 21.15 1.5 21.15C1.6 21.15 1.65 21.1 1.75 21.1C3.1 20.45 5.05 20 6.5 20C8.45 20 10.55 20.4 12 21.5C13.35 20.65 15.8 20 17.5 20C19.15 20 20.85 20.3 22.25 21.05C22.35 21.1 22.4 21.1 22.5 21.1C22.75 21.1 23 20.85 23 20.6V6C22.4 5.55 21.75 5.25 21 5ZM21 18.5C19.9 18.15 18.7 18 17.5 18C15.8 18 13.35 18.65 12 19.5V8C13.35 7.15 15.8 6.5 17.5 6.5C18.7 6.5 19.9 6.65 21 7V18.5Z"
                    fill="#1E1E1E"
                />
                <path
                    d="M17.5 10.5C18.38 10.5 19.23 10.59 20 10.76V9.24C19.21 9.09 18.36 9 17.5 9C15.8 9 14.26 9.29 13 9.83V11.49C14.13 10.85 15.7 10.5 17.5 10.5Z"
                    fill="#5C5C5C"
                />
                <path
                    d="M13 12.4902V14.1502C14.13 13.5102 15.7 13.1602 17.5 13.1602C18.38 13.1602 19.23 13.2502 20 13.4202V11.9002C19.21 11.7502 18.36 11.6602 17.5 11.6602C15.8 11.6602 14.26 11.9602 13 12.4902Z"
                    fill="#5C5C5C"
                />
                <path
                    d="M17.5 14.3281C15.8 14.3281 14.26 14.6181 13 15.1581V16.8181C14.13 16.1781 15.7 15.8281 17.5 15.8281C18.38 15.8281 19.23 15.9181 20 16.0881V14.5681C19.21 14.4081 18.36 14.3281 17.5 14.3281Z"
                    fill="#5C5C5C"
                />
            </svg>
        ),
        "Wireless Solution - Restaurant Blueprints": (
            <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>This is Wireless Solution - Restaurant Blueprints icon</title>
                <rect width={24} height={24} rx={12} fill="#E8EEFF" />
                <path
                    d="M20 5V4C20 3.45 19.55 3 19 3H17C16.45 3 16 3.45 16 4V5H15V9C15 9.55 15.45 10 16 10H17V17C17 18.1 16.1 19 15 19C13.9 19 13 18.1 13 17V7C13 4.79 11.21 3 9 3C6.79 3 5 4.79 5 7V14H4C3.45 14 3 14.45 3 15V19H4V20C4 20.55 4.45 21 5 21H7C7.55 21 8 20.55 8 20V19H9V15C9 14.45 8.55 14 8 14H7V7C7 5.9 7.9 5 9 5C10.1 5 11 5.9 11 7V17C11 19.21 12.79 21 15 21C17.21 21 19 19.21 19 17V10H20C20.55 10 21 9.55 21 9V5H20Z"
                    fill="#1E1E1E"
                />
            </svg>
        )
    }
    const discription = {
        "Credit Card VAR": `A Credit Card VAR sheet is the document that holds all the data to program your system to be able to accept payments and route those payments to your bank account. This can be obtained from your Credit Card Processor.`,
        Menu: "Submitting a menu/menu files early in the implementation process is necessary to allow enough time to program, review, and make any necessary changes prior to your installation.",
        "Floor Plan":
            "The Floor Plan feature replaces the Working with Tables screen as the default screen used to start a new order. With a little creativity and Panel Editor tools, you can create a functional floor plan that represents the layout of your restaurant.",
        "Wireless Solution - Restaurant Blueprints":
            "NCR will use the map you provide to conduct an on-site wireless survey which will help determine optimal placement of your wireless access points."
    }
    const System = (e) => {
        let docs = tasks?.find(
            (it) => it.task_name == "Upload Required Documents"
        )
        let docscheck = docs?.json[e]
        return docscheck
    }

    return (
        <Box
            sx={{
                display: "grid",
                gap: 4,
                gridTemplateColumns: {
                    xs: "repeat(1, minmax(0, 1fr))",
                    md: "repeat(2, minmax(0, 1fr))"
                }
            }}
        >
            {discoveryloading
                ? [1, 2, 3, 4].map((it) => (
                      <Skeleton
                          key={it}
                          variant="rectangular"
                          sx={{ borderRadius: 3 }}
                          width={"100%"}
                          height={516}
                      />
                  ))
                : documents["subStages"].map((sub, ind) => (
                      <React.Fragment key={`${sub.name + ind}`}>
                          {sub.name !== "Documents Overview" && (
                              <Grid
                                  className="shadow"
                                  sx={{
                                      borderRadius: 3,
                                      background: "#fff",
                                      width: "100%"
                                  }}
                              >
                                  <Box
                                      sx={{
                                          mx: 5,
                                          mt: 5,
                                          position: "relative",
                                          zIndex: 1,
                                          height: 196,
                                          width: "auto"
                                      }}
                                  >
                                      <Image
                                          layout="fill"
                                          alt={sub.name}
                                          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/svgs/${sub.type}.svg`}
                                      />
                                  </Box>
                                  <Box
                                      sx={{
                                          minHeight: { lg: 370, md: 446 },
                                          mt: -10,
                                          borderRadius: 3,
                                          borderTopLeftRadius: 0,
                                          borderTopRightRadius: 0,
                                          position: "relative",
                                          zIndex: 10,
                                          display: "flex",
                                          p: 5,
                                          background: "#fff",
                                          flexDirection: "column",
                                          justifyContent: "space-between",
                                          width: "100%",
                                          boxShadow:
                                              " 0px -4px 12px rgba(201, 201, 201, 0.25)"
                                      }}
                                  >
                                      <Box>
                                          <Box
                                              sx={{
                                                  display: "flex",
                                                  justifyContent:
                                                      "space-between",
                                                  alignItems: "flex-start"
                                              }}
                                          >
                                              <Typography
                                                  sx={{
                                                      fontSize:
                                                          theme.fontsize.lg,
                                                      fontWeight: 600,
                                                      lineHeight: "28px",
                                                      color: theme.palette
                                                          .textColor.main,
                                                      display: "flex",
                                                      alignItems: "center",
                                                      gap: 3,
                                                      mb: 2
                                                  }}
                                              >
                                                  {svg[sub.name]}
                                                  <Box component={"span"}>
                                                      {sub.name}
                                                  </Box>
                                              </Typography>
                                              <Box
                                                  sx={{
                                                      fontSize:
                                                          theme.fontsize.xs,
                                                      lineHeight: "18px",
                                                      px: 2,
                                                      py: "3px",
                                                      borderRadius: 6,
                                                      background: System(
                                                          sub.type
                                                      )
                                                          ? theme.chips.background.warning
                                                          : theme.chips.background.progress,
                                                      color: System(sub.type)
                                                          ? theme.chips.text.warning
                                                          : theme.chips.text.progress,
                                                      fontWeight: 400
                                                  }}
                                              >
                                                  {System(sub.type)
                                                      ? "Required"
                                                      : "Optional"}
                                              </Box>
                                          </Box>

                                          <Typography
                                              sx={{
                                                  mb: {
                                                      xl: ind !== 1 && 0,
                                                      xs: 6
                                                  },

                                                  mt: 4,
                                                  fontSize: theme.fontsize.sm,
                                                  lineHeight: "22px",

                                                  color: theme.palette.secondary
                                                      .main
                                              }}
                                          >
                                              {discription[sub.name]}
                                          </Typography>
                                          <Typography
                                              sx={{
                                                  my: 4,
                                                  maxWidth: "max-content",
                                                  color:
                                                      docsnumber(sub.type) == 0
                                                          ? theme.chips.text.red
                                                          : theme.chips.text.progress,
                                                  px: 2,
                                                  py: "3px",
                                                  borderRadius: 6,
                                                  fontSize: theme.fontsize.xs,
                                                  lineHeight: "18px",
                                                  background:
                                                      docsnumber(sub.type) == 0
                                                          ? theme.chips.background.red
                                                          : theme.chips.background.progress
                                              }}
                                          >
                                              Documents Submitted:{" "}
                                              {docsnumber(sub.type)}
                                          </Typography>
                                      </Box>

                                      <Box
                                          sx={{
                                              display: "flex",
                                              flexDirection: "column",
                                              justifyContent: "flex-end"
                                          }}
                                      >
                                          <Button
                                              href={fileroute[sub.name]}
                                              target={"_blank"}
                                              sx={{
                                                  background: "#FAFAFA",
                                                  width: "100%",
                                                  border: "1px dashed #E0E0E0",
                                                  borderRadius: "8px",
                                                  py: "9px",
                                                  pl: {
                                                      md: "17px",
                                                      xs: "32px"
                                                  },
                                                  pr: {
                                                      md: "23px",
                                                      xs: "39px"
                                                  },
                                                  "&:hover": {
                                                      bgcolor: "#F5F6FF ",
                                                      border: "1px dashed #1D4ED8 "
                                                  },
                                                  display: "flex",
                                                  justifyContent:
                                                      "space-between"
                                              }}
                                          >
                                              <Typography
                                                  sx={{
                                                      display: "flex",
                                                      alignItems: "center",
                                                      gap: 2,
                                                      mr: "9px",
                                                      fontSize: "14px",
                                                      lineHeight: "22px",
                                                      fontWeight: 600,
                                                      textTransform: "none",
                                                      color: theme.palette
                                                          .primary.main,
                                                      cursor: "pointer"
                                                  }}
                                              >
                                                  <Image
                                                      src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/svgs/fileicon.svg`}
                                                      alt={"File Icon"}
                                                      width={24}
                                                      height={24}
                                                  />
                                                  {filename[sub.name]} Template
                                              </Typography>

                                              <svg
                                                  width={11.67}
                                                  height={14.17}
                                                  viewBox="0 0 14 17"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <title>This is {filename[sub.name]} template download icon</title>
                                                  <path
                                                      d="M14 6H10V0H4V6H0L7 13L14 6ZM6 8V2H8V8H9.17L7 10.17L4.83 8H6ZM0 15H14V17H0V15Z"
                                                      fill={
                                                          theme.palette.primary
                                                              .main
                                                      }
                                                  />
                                              </svg>
                                          </Button>
                                          <CommonButton
                                               ariaTag={"This is View Button"}
                                              textTransform="capitalize"
                                              className={"back-button"}
                                              svgicon={
                                                  <svg
                                                      width={20}
                                                      height={20}
                                                      viewBox="0 0 20 20"
                                                      fill="none"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <title>This is view button arrow icon</title>
                                                      <g clipPath="url(#clip0_836_22040)">
                                                          <path
                                                              d="M7.86492 6.17539L8.3332 5.70711L12.6261 10L8.3332 14.2929L7.86492 13.8246L11.3288 10.3532L11.6812 10L11.3288 9.64683L7.86492 6.17539Z"
                                                              fill="currentColor"
                                                              stroke="currentColor"
                                                          />
                                                      </g>
                                                      <defs>
                                                          <clipPath >
                                                              <rect
                                                                  width={20}
                                                                  height={20}
                                                                  fill="white"
                                                              />
                                                          </clipPath>
                                                      </defs>
                                                  </svg>
                                              }
                                              onclickHandler={() =>
                                                  onClickNextStep(sub.name)
                                              }
                                              variant={"outline"}
                                              textColor={
                                                  sub.percentage == 100
                                                      ? "#4CAF50"
                                                      : "#1D4ED8"
                                              }
                                              mt={4}
                                              py={2.5}
                                              fontSize="14px"
                                              fontWeight={600}
                                              lineHeight="22px"
                                              content={"View"}
                                              width={"100%"}
                                          />
                                      </Box>
                                  </Box>
                              </Grid>
                          )}
                      </React.Fragment>
                  ))}
        </Box>
    )
}
