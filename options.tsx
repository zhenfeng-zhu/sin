import { ChakraProvider, Container } from "@chakra-ui/react"
import { useEffect, useState } from "react"

import SinTab from "~compontents/sin_tab"
import SinWindow from "~compontents/sin_window"

function OptionsIndex() {
  const [hide, setHide] = useState(false)

  function onInputChange(inputValue) {
    console.log(inputValue)
    if (inputValue.target.value == "") {
      setHide(false)
    } else {
      setHide(true)
    }
  }

  return (
    <ChakraProvider>
      <Container borderWidth="1px" borderRadius="lg">
        <SinWindow onInputChange={onInputChange} />
        <SinTab hide={hide} />
      </Container>
    </ChakraProvider>
  )
}

export default OptionsIndex
