import * as React from "react"
import Head from "next/head"
import { Provider } from "react-redux"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Store from "../store/store"
import { CacheProvider, EmotionCache } from "@emotion/react"
import Script from "next/script"
import theme from "../src/theme"
// import Auth from "../components/middlewares/Auth"
const Auth = dynamic(() => import("../components/middlewares/Auth"), {
    ssr: false
})
import Layout from "../components/Layout"
import createEmotionCache from "../src/createEmotionCache"
import "../styles/globals.css"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export default function MyApp(props) {
    const { asPath } = useRouter()
    const {
        Component,
        emotionCache = clientSideEmotionCache,
        pageProps
    } = props

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <title>NCR Onboarding</title>
                <link
                    rel="icon"
                    href={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/images/favicon.svg`}
                    sizes="any"
                    type="image/svg+xml"
                />
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
                {/* <link
                    rel="stylesheet"
                    href="/css/react-phone-number-input/style.css"
                /> */}
                <script
                    type="text/javascript"
                    dangerouslySetInnerHTML={{
                        __html: `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "fckbzo7cb3");`
                    }}
                />
                {process.env.NEXT_PUBLIC_APP_ENV === "production" && (
                    <>
                        <script
                            type="text/javascript"
                            dangerouslySetInnerHTML={{
                                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': 
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], 
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=                
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);                
                })(window,document,'script','dataLayer', 'GTM-TRX4PSD');`
                            }}
                        />
                        <Script
                            type="text/javascript"
                            src="https://www.googletagmanager.com/ns.html?id= GTM-TRX4PSD"
                        />
                    </>
                )}
            </Head>
            <ThemeProvider theme={theme}>
                <Provider store={Store}>
                    <Auth>
                        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                        <CssBaseline />
                        {asPath.includes("api-status") ? (
                            <Component {...pageProps} />
                        ) : (
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        )}
                    </Auth>
                </Provider>
            </ThemeProvider>
        </CacheProvider>
    )
}
