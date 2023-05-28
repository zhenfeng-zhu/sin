import {
  Avatar,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  IconButton,
  Input,
  List,
  ListItem,
  Text
} from "@chakra-ui/react"
import {
  AutoComplete,
  AutoCompleteGroup,
  AutoCompleteGroupTitle,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList
} from "@choc-ui/chakra-autocomplete"
import { CUIAutoComplete } from "chakra-ui-autocomplete"
import * as _ from "lodash"
import { type ChangeEvent, useEffect, useState } from "react"
import * as React from "react"

async function getTabs() {
  return (await chrome.tabs.query({})).map((item) => {
    return {
      value: item.title,
      label: item.title,
      ...item
    }
  })
}

async function groupByWindowId() {
  console.log("------------------>")
  const tabs = await chrome.tabs.query({})
  const data = _.chain(tabs)
    .groupBy("windowId")
    .map((value, key) => {
      return { windowId: key, tabs: value }
    })
    .value()
  console.log(data)
}

type Item = {
  label: string
  value: string
}

const countries = [
  { value: "ghana", label: "Ghana" },
  { value: "nigeria", label: "Nigeria" },
  { value: "kenya", label: "Kenya" },
  { value: "southAfrica", label: "South Africa" },
  { value: "unitedStates", label: "United States" },
  { value: "canada", label: "Canada" },
  { value: "germany", label: "Germany" }
]

function SinWindow() {
  const continents = {
    africa: ["nigeria", "south africa"],
    asia: ["japan", "south korea"],
    europe: ["united kingdom", "russia"]
  }

  return (
    <Flex justify="center" align="center" w="full">
      <FormControl w="60">
        <FormLabel>Olympics Soccer Winner</FormLabel>
        <AutoComplete >
          <AutoCompleteInput variant="filled" />
          <AutoCompleteList>
            {Object.entries(continents).map(([continent, countries], co_id) => (
              <AutoCompleteGroup key={co_id} showDivider>
                <AutoCompleteGroupTitle textTransform="capitalize">
                  {continent}
                </AutoCompleteGroupTitle>
                {countries.map((country, c_id) => (
                  <AutoCompleteItem
                    key={c_id}
                    value={country}
                    textTransform="capitalize">
                    {country}
                  </AutoCompleteItem>
                ))}
              </AutoCompleteGroup>
            ))}
          </AutoCompleteList>
        </AutoComplete>
        <FormHelperText>Who do you support.</FormHelperText>
      </FormControl>
    </Flex>
  )
}

export default SinWindow
