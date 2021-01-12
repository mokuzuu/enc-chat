import '../styles/globals.css'
import { RecoilRoot } from 'recoil'
import { ChakraProvider } from '@chakra-ui/react'
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </ChakraProvider>
  )
}

export default MyApp
