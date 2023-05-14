import { ChakraProvider } from "@chakra-ui/react"
import { useEffect, useState } from "react"

import DrawerExample from "~compontents/drawer"
import SinTab from "~compontents/sin_tab"

function IndexPopup() {
  return (
    <ChakraProvider>
      <SinTab />
    </ChakraProvider>
  )
}

export default IndexPopup
