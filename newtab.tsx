import { ChakraProvider } from "@chakra-ui/react"

import SinTab from "~compontents/sin_tab"
import SinWindow from "~compontents/sin_window"

function IndexNewtab() {
  return (
    <ChakraProvider>
      <SinWindow />

      <SinTab />
    </ChakraProvider>
  )
}

export default IndexNewtab
