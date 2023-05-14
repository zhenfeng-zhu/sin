import { ChakraProvider } from "@chakra-ui/react"
import { useEffect, useState } from "react"

import SinTab from "~compontents/sin_tab"

function OptionsIndex() {
  return (
    <ChakraProvider>
      <SinTab />
    </ChakraProvider>
  )
}

export default OptionsIndex
