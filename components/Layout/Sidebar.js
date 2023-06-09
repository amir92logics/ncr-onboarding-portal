import { Box } from "@mui/material"
import React from "react"
import Sidebardata from "./SidebarData"
import Link from "next/link"
import { useMediaQuery, Backdrop, Divider } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import DehazeIcon from "@mui/icons-material/Dehaze"
import { visuallyHidden } from "@mui/utils"
import CloseIcon from "@mui/icons-material/Close"
import { setSidebarToggle } from "../../redux-setup/dataSlice"
import Image from "next/image"
import { useRouter } from "next/router"

function Sidebar() {
    const dispatch = useDispatch()
    const show = useSelector((state) => state.dataSlice.sidebarToggle)
    const isMobile = useMediaQuery((Theme) => Theme.breakpoints.down("lg"))
    const router = useRouter()
    const path = router.pathname
    return (
        <>
            {!isMobile ? (
                <Box
                    sx={{
                        display: {
                            lg: "block",
                            xs: "none"
                        },
                        zIndex: "99",
                        width: "240px",
                        background: "white",
                        height: "100%",
                        borderRight: "1px solid #E0E0E0",
                        position: "fixed"
                    }}
                >
                    <Box
                        sx={{
                            width: "240px",

                            overflow: "auto",

                            left: "0",
                            top: "0"
                        }}
                    >
                        <Box
                            sx={{
                                px: "8px",
                                py: "4px",
                                mt: "10px",
                                height: "64px",
                                marginTop: "0px",
                                position: "relative",
                                justifyContent: "center",

                                px: {
                                    xs: "16px",
                                    lg: "0"
                                }
                            }}
                            flexGrow={1}
                            display="flex"
                            alignItems="center"
                        >
                            <Link href="/">
                                <Box
                                    sx={{
                                        height: "26px",
                                        lineHeight: "none",
                                        position: "fixed",
                                        cursor: "pointer"
                                    }}
                                >
                                    <svg
                                        width={85}
                                        height={24}
                                        viewBox="0 0 85 24"
                                        fill="#FFF"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title>This is Home logo icon</title>
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M24.0537 0.0296159C21.4073 0.352302 19.095 1.40113 17.191 3.14246C16.6959 3.59536 8.36141 12.2104 8.36599 12.2647C8.36787 12.287 9.02603 12.9308 9.82855 13.6954L11.2877 15.0854L11.4971 14.8725C11.6122 14.7553 13.5172 12.7873 15.7304 10.4991C19.9251 6.1622 20.0053 6.0809 20.3878 5.77676C23.8552 3.02013 28.877 3.61614 31.6328 7.11143C32.9611 8.79617 33.5548 11.0476 33.2215 13.1356C32.8579 15.4131 31.5786 17.3554 29.6005 18.6337C28.8602 19.112 27.8178 19.5379 26.9646 19.7107C25.6572 19.9755 24.2253 19.9092 23.0443 19.5294L22.7261 19.427L21.2266 20.9399C20.4019 21.7719 19.7264 22.4715 19.7254 22.4945C19.7245 22.5175 19.7743 22.5572 19.836 22.5826C19.8978 22.6081 20.195 22.7311 20.4963 22.8559C21.4968 23.2702 22.7145 23.6255 23.7882 23.8164C24.409 23.9268 25.8189 23.9673 26.5329 23.8953C28.8591 23.6608 30.9286 22.8334 32.8363 21.3753C33.3033 21.0183 34.4317 19.9073 34.8133 19.4288C35.8336 18.1493 36.6674 16.4881 37.0641 14.9449C37.7987 12.0869 37.4719 9.08083 36.1462 6.50149C34.6407 3.57243 32.0388 1.42313 28.833 0.460514C28.3359 0.311226 27.807 0.194247 27.1369 0.0853858C26.6579 0.00757577 24.5476 -0.0306189 24.0537 0.0296159ZM11.1066 0.0689471C8.17788 0.296654 5.53776 1.49859 3.48615 3.53821C1.82812 5.18659 0.681241 7.30958 0.216337 9.59112C0.029901 10.506 -0.0173206 11.1041 0.0051873 12.2647C0.0265106 13.3664 0.069974 13.7634 0.264498 14.6342C1.15068 18.6019 4.08361 21.9155 7.9387 23.3044C8.62019 23.55 9.5464 23.7845 10.2919 23.9001C11.0857 24.0233 12.9713 24.035 13.7393 23.9215C16.2536 23.55 18.4619 22.5071 20.3024 20.8221C20.6225 20.529 28.1562 12.7664 29.0093 11.8505L29.1243 11.7271L27.6666 10.3318C26.8649 9.56429 26.1949 8.93637 26.1777 8.93637C26.1604 8.93637 24.2463 10.9006 21.924 13.3013C19.6017 15.7021 17.5914 17.7663 17.4566 17.8885C16.0203 19.1902 14.0452 19.9564 12.1257 19.9564C10.3254 19.9564 8.51647 19.3175 7.1013 18.1819C6.74158 17.8932 6.09559 17.2381 5.8293 16.8919C5.07395 15.91 4.55836 14.7902 4.29974 13.57C4.17143 12.9646 4.11955 11.7209 4.1979 11.1282C4.44059 9.29226 5.21484 7.70972 6.49056 6.44211C7.66322 5.2769 9.10017 4.53586 10.7974 4.22101C11.2672 4.13386 12.4838 4.10399 13.0173 4.16654C13.4499 4.21723 14.2335 4.38982 14.5659 4.50769L14.739 4.56902L15.1412 4.15497C15.9759 3.29577 17.6613 1.52189 17.6727 1.49055C17.6792 1.47261 17.6517 1.44777 17.6114 1.43535C17.5712 1.42293 17.3085 1.31318 17.0276 1.19145C15.9522 0.725401 14.5101 0.305868 13.4495 0.150532C12.7835 0.0529954 11.7671 0.0176014 11.1066 0.0689471ZM17.0786 10.6717L12.0439 15.6745L13.4942 17.1152L14.9445 18.5558L19.9892 13.5433L25.0339 8.53076L23.5943 7.09982C22.8025 6.31283 22.1453 5.66892 22.1339 5.66892C22.1226 5.66892 19.8476 7.92017 17.0786 10.6717Z"
                                            fill="#55B848"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M62.8218 5.02806C61.4162 5.15267 60.1204 5.49212 59.0408 6.01844C57.1212 6.95431 56.0298 8.36342 55.6634 10.3789C55.594 10.7608 55.5769 11.0273 55.5732 11.7838C55.5683 12.7868 55.5928 13.007 55.7942 13.7727C56.3493 15.8832 57.8118 17.4584 60.0123 18.3159C60.5877 18.5402 60.9673 18.6327 61.7573 18.7415C64.3405 19.097 66.8209 19.0899 68.6569 18.7217C68.9357 18.6658 69.1792 18.6106 69.1982 18.5989C69.2171 18.5873 69.2327 17.9687 69.2327 17.2244V15.8711L68.9365 15.9478C68.0876 16.1676 66.6627 16.3971 65.6602 16.4756C64.9098 16.5344 63.4872 16.5021 62.9215 16.4136C61.5832 16.2041 60.6551 15.7907 59.9599 15.0945C59.4662 14.6002 59.1975 14.0472 58.9524 13.0218C58.8121 12.4346 58.7777 11.5304 58.8759 11.0126C59.0999 9.83089 59.8255 8.90797 61.005 8.30456C61.4079 8.09849 61.7723 8.00607 62.7172 7.87038C65.0707 7.53247 67.2831 7.76119 68.7359 8.49274C68.8504 8.55033 68.963 8.5975 68.9862 8.5975C69.0145 8.5975 69.0284 8.12159 69.0284 7.15836V5.71918L68.7118 5.62001C67.973 5.38865 66.6576 5.15916 65.5562 5.0695C64.7958 5.0076 63.3071 4.98503 62.8218 5.02806ZM41.4961 11.9833V18.7855H42.9462H44.3964V14.8883V10.9912L49.3289 15.0774C52.0418 17.3248 54.2936 19.191 54.3329 19.2244C54.401 19.2822 54.4044 18.9455 54.4044 12.2365V5.18798H52.8319H51.2595L51.249 9.08956L51.2386 12.9911L46.4053 9.09971C43.747 6.95943 41.5549 5.20219 41.534 5.19476C41.5108 5.18644 41.4961 7.81246 41.4961 11.9833ZM70.6215 12.2288V19.029H72.194H73.7665L73.7769 15.4238L73.7874 11.8186L77.3392 15.4238L80.8911 19.029H82.9457C84.0758 19.029 85.0005 19.0226 85.0005 19.0147C85.0005 19.0069 83.7834 17.8334 82.2959 16.4069L79.5912 13.8132L79.7734 13.802C80.4809 13.7581 81.468 13.4072 82.1191 12.9683C82.4466 12.7474 83.0086 12.2063 83.2294 11.8992C83.4491 11.5936 83.7009 11.0625 83.7943 10.7082C83.8884 10.3507 83.9221 9.49213 83.8576 9.09378C83.7835 8.63516 83.6295 8.13603 83.445 7.75555C82.9714 6.77913 81.6321 5.99591 79.7309 5.58357L79.1386 5.4551L74.8801 5.44187L70.6215 5.42868V12.2288ZM78.3893 7.66357C79.7162 7.79188 80.5037 8.33326 80.6673 9.22964C80.7194 9.51551 80.6711 10.1007 80.5727 10.3737C80.4885 10.6075 80.2995 10.8727 80.0889 11.0527C79.8606 11.248 79.3475 11.4896 78.9139 11.606C78.5734 11.6975 78.5202 11.6995 76.1668 11.7132L73.7669 11.7271V9.67523V7.62335L75.8809 7.6244C77.0436 7.62497 78.1723 7.64259 78.3893 7.66357Z"
                                            fill="#959FA9"
                                        />
                                    </svg>
                                    <span style={{ display: "none" }}>
                                        Home logo
                                    </span>
                                </Box>
                            </Link>
                        </Box>
                        {/* {path === "/" && <Box sx={{marginTop:"px"}}></Box>} */}
                        <Sidebardata mainpage={true} />

                        <Box
                            sx={{
                                maxHeight: "64px",
                                borderTop: "1px solid #E0E0E0",
                                height: "100%",
                                position: {
                                    xs: `fixed`
                                },
                                bottom: "0",
                                width: {
                                    xs: "240px"
                                },
                                borderRight: "1px solid #E0E0E0"
                            }}
                        >
                            <Image
                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/svgs/bottomLogo.svg`}
                                alt="NCR"
                                layout="fill"
                            />
                        </Box>
                    </Box>
                </Box>
            ) : (
                <Box
                    sx={{
                        background: "rgb(250, 250, 250)",
                        minHeight: "100vh",
                        height: "100%",
                        // mt:"9px",
                        display: { lg: "none", md: "flex" }
                    }}
                    className=""
                >
                    <DehazeIcon
                        sx={{
                            position: "fixed !important",
                            zIndex: "800",
                            margin: "12px",
                            marginTop: "21px",
                            cursor: "pointer",
                            color: "#5C5C5C !important",
                            mx: { md: "40px", xs: "31px" }
                        }}
                        onClick={() => dispatch(setSidebarToggle(!show))}
                    />

                    <Box>
                        <Backdrop
                            sx={{
                                mt: "0px",
                                position: "fixed",
                                width: "100%",
                                transform: "translate3d(0,0,0)",
                                minHeight: "80vh",
                                zIndex: "101",
                                backgroundColor: "rgba(0, 0, 0, 0.5)"
                            }}
                            onClick={() => dispatch(setSidebarToggle(!show))}
                            open={isMobile && show}
                        />
                        <Box
                            className="scrollbar"
                            sx={{
                                left: `${!isMobile || show ? "0" : "-100%"}`,
                                transitionProperty: "all",
                                transitionDuration: "500ms",
                                transitionTimingFunction:
                                    "cubic-bezier(0.4, 0, 0.2, 1)",
                                position: "fixed",
                                flexShrink: 0,
                                height: "100%",
                                zIndex: 900,
                                background: "white",
                                overflowY: "auto",
                                width: {
                                    xs: "240px"
                                }
                            }}
                        >
                            <Box
                                sx={{
                                    mt: "10px",
                                    height: "57px",
                                    marginTop: "0px",
                                    position: "relative",
                                    justifyContent: "center",
                                    paddingRight: {
                                        xs: "16px",
                                        lg: "0"
                                    },
                                    pt: "10px"
                                }}
                                flexGrow={1}
                                display="flex"
                                alignItems="center"
                            >
                                <Link href="/">
                                    <Box
                                        sx={{
                                            height: "26px",
                                            lineHeight: "none",
                                            cursor: "pointer"
                                        }}
                                    >
                                        <svg
                                            width={85}
                                            height={24}
                                            viewBox="0 0 85 24"
                                            fill="#FFF"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <title>This is Home logo icon</title>
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M24.0537 0.0296159C21.4073 0.352302 19.095 1.40113 17.191 3.14246C16.6959 3.59536 8.36141 12.2104 8.36599 12.2647C8.36787 12.287 9.02603 12.9308 9.82855 13.6954L11.2877 15.0854L11.4971 14.8725C11.6122 14.7553 13.5172 12.7873 15.7304 10.4991C19.9251 6.1622 20.0053 6.0809 20.3878 5.77676C23.8552 3.02013 28.877 3.61614 31.6328 7.11143C32.9611 8.79617 33.5548 11.0476 33.2215 13.1356C32.8579 15.4131 31.5786 17.3554 29.6005 18.6337C28.8602 19.112 27.8178 19.5379 26.9646 19.7107C25.6572 19.9755 24.2253 19.9092 23.0443 19.5294L22.7261 19.427L21.2266 20.9399C20.4019 21.7719 19.7264 22.4715 19.7254 22.4945C19.7245 22.5175 19.7743 22.5572 19.836 22.5826C19.8978 22.6081 20.195 22.7311 20.4963 22.8559C21.4968 23.2702 22.7145 23.6255 23.7882 23.8164C24.409 23.9268 25.8189 23.9673 26.5329 23.8953C28.8591 23.6608 30.9286 22.8334 32.8363 21.3753C33.3033 21.0183 34.4317 19.9073 34.8133 19.4288C35.8336 18.1493 36.6674 16.4881 37.0641 14.9449C37.7987 12.0869 37.4719 9.08083 36.1462 6.50149C34.6407 3.57243 32.0388 1.42313 28.833 0.460514C28.3359 0.311226 27.807 0.194247 27.1369 0.0853858C26.6579 0.00757577 24.5476 -0.0306189 24.0537 0.0296159ZM11.1066 0.0689471C8.17788 0.296654 5.53776 1.49859 3.48615 3.53821C1.82812 5.18659 0.681241 7.30958 0.216337 9.59112C0.029901 10.506 -0.0173206 11.1041 0.0051873 12.2647C0.0265106 13.3664 0.069974 13.7634 0.264498 14.6342C1.15068 18.6019 4.08361 21.9155 7.9387 23.3044C8.62019 23.55 9.5464 23.7845 10.2919 23.9001C11.0857 24.0233 12.9713 24.035 13.7393 23.9215C16.2536 23.55 18.4619 22.5071 20.3024 20.8221C20.6225 20.529 28.1562 12.7664 29.0093 11.8505L29.1243 11.7271L27.6666 10.3318C26.8649 9.56429 26.1949 8.93637 26.1777 8.93637C26.1604 8.93637 24.2463 10.9006 21.924 13.3013C19.6017 15.7021 17.5914 17.7663 17.4566 17.8885C16.0203 19.1902 14.0452 19.9564 12.1257 19.9564C10.3254 19.9564 8.51647 19.3175 7.1013 18.1819C6.74158 17.8932 6.09559 17.2381 5.8293 16.8919C5.07395 15.91 4.55836 14.7902 4.29974 13.57C4.17143 12.9646 4.11955 11.7209 4.1979 11.1282C4.44059 9.29226 5.21484 7.70972 6.49056 6.44211C7.66322 5.2769 9.10017 4.53586 10.7974 4.22101C11.2672 4.13386 12.4838 4.10399 13.0173 4.16654C13.4499 4.21723 14.2335 4.38982 14.5659 4.50769L14.739 4.56902L15.1412 4.15497C15.9759 3.29577 17.6613 1.52189 17.6727 1.49055C17.6792 1.47261 17.6517 1.44777 17.6114 1.43535C17.5712 1.42293 17.3085 1.31318 17.0276 1.19145C15.9522 0.725401 14.5101 0.305868 13.4495 0.150532C12.7835 0.0529954 11.7671 0.0176014 11.1066 0.0689471ZM17.0786 10.6717L12.0439 15.6745L13.4942 17.1152L14.9445 18.5558L19.9892 13.5433L25.0339 8.53076L23.5943 7.09982C22.8025 6.31283 22.1453 5.66892 22.1339 5.66892C22.1226 5.66892 19.8476 7.92017 17.0786 10.6717Z"
                                                fill="#55B848"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M62.8218 5.02806C61.4162 5.15267 60.1204 5.49212 59.0408 6.01844C57.1212 6.95431 56.0298 8.36342 55.6634 10.3789C55.594 10.7608 55.5769 11.0273 55.5732 11.7838C55.5683 12.7868 55.5928 13.007 55.7942 13.7727C56.3493 15.8832 57.8118 17.4584 60.0123 18.3159C60.5877 18.5402 60.9673 18.6327 61.7573 18.7415C64.3405 19.097 66.8209 19.0899 68.6569 18.7217C68.9357 18.6658 69.1792 18.6106 69.1982 18.5989C69.2171 18.5873 69.2327 17.9687 69.2327 17.2244V15.8711L68.9365 15.9478C68.0876 16.1676 66.6627 16.3971 65.6602 16.4756C64.9098 16.5344 63.4872 16.5021 62.9215 16.4136C61.5832 16.2041 60.6551 15.7907 59.9599 15.0945C59.4662 14.6002 59.1975 14.0472 58.9524 13.0218C58.8121 12.4346 58.7777 11.5304 58.8759 11.0126C59.0999 9.83089 59.8255 8.90797 61.005 8.30456C61.4079 8.09849 61.7723 8.00607 62.7172 7.87038C65.0707 7.53247 67.2831 7.76119 68.7359 8.49274C68.8504 8.55033 68.963 8.5975 68.9862 8.5975C69.0145 8.5975 69.0284 8.12159 69.0284 7.15836V5.71918L68.7118 5.62001C67.973 5.38865 66.6576 5.15916 65.5562 5.0695C64.7958 5.0076 63.3071 4.98503 62.8218 5.02806ZM41.4961 11.9833V18.7855H42.9462H44.3964V14.8883V10.9912L49.3289 15.0774C52.0418 17.3248 54.2936 19.191 54.3329 19.2244C54.401 19.2822 54.4044 18.9455 54.4044 12.2365V5.18798H52.8319H51.2595L51.249 9.08956L51.2386 12.9911L46.4053 9.09971C43.747 6.95943 41.5549 5.20219 41.534 5.19476C41.5108 5.18644 41.4961 7.81246 41.4961 11.9833ZM70.6215 12.2288V19.029H72.194H73.7665L73.7769 15.4238L73.7874 11.8186L77.3392 15.4238L80.8911 19.029H82.9457C84.0758 19.029 85.0005 19.0226 85.0005 19.0147C85.0005 19.0069 83.7834 17.8334 82.2959 16.4069L79.5912 13.8132L79.7734 13.802C80.4809 13.7581 81.468 13.4072 82.1191 12.9683C82.4466 12.7474 83.0086 12.2063 83.2294 11.8992C83.4491 11.5936 83.7009 11.0625 83.7943 10.7082C83.8884 10.3507 83.9221 9.49213 83.8576 9.09378C83.7835 8.63516 83.6295 8.13603 83.445 7.75555C82.9714 6.77913 81.6321 5.99591 79.7309 5.58357L79.1386 5.4551L74.8801 5.44187L70.6215 5.42868V12.2288ZM78.3893 7.66357C79.7162 7.79188 80.5037 8.33326 80.6673 9.22964C80.7194 9.51551 80.6711 10.1007 80.5727 10.3737C80.4885 10.6075 80.2995 10.8727 80.0889 11.0527C79.8606 11.248 79.3475 11.4896 78.9139 11.606C78.5734 11.6975 78.5202 11.6995 76.1668 11.7132L73.7669 11.7271V9.67523V7.62335L75.8809 7.6244C77.0436 7.62497 78.1723 7.64259 78.3893 7.66357Z"
                                                fill="#959FA9"
                                            />
                                        </svg>
                                        <span style={{ display: "none" }}>
                                            Home logo
                                        </span>
                                    </Box>
                                </Link>

                                <Box
                                    sx={{ position: "absolute", right: "16px" }}
                                    display="flex"
                                    alignSelf="center"
                                >
                                    <CloseIcon
                                        style={{ cursor: "pointer" }}
                                        color="secondary"
                                        onClick={() =>
                                            dispatch(setSidebarToggle(!show))
                                        }
                                    />
                                </Box>
                            </Box>

                            <Divider
                                className="divider-col"
                                style={{
                                    width: "100%",
                                    marginBottom: "20px",
                                    marginTop: "9px"
                                }}
                            />

                            <Sidebardata />
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    )
}

export default Sidebar
