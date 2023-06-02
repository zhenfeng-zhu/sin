import {
  AutoComplete,
  AutoCompleteGroup,
  AutoCompleteGroupTitle,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList
} from "@choc-ui/chakra-autocomplete"
import _, { set } from "lodash"
import { useEffect, useState } from "react"

async function groupByHost() {
  const tabs = await chrome.tabs.query({})
  const data = _.chain(tabs)
    .map((value, key) => {
      const url = new URL(value.url)
      return { host: url.host, ...value }
    })
    .groupBy("host")
    .map((value, key) => {
      return { host: key, tabs: value }
    })
    .reduce((acc, cur) => {
      acc[cur.host] = cur.tabs
      return acc
    }, {})
    .value()
  return data
}

function SinWindow(props) {
  const [continents, setContinents] = useState({})

  useEffect(() => {
    groupByHost().then((value) => {
      setContinents(value)
    })
  }, [])

  return (
    <AutoComplete>
      <AutoCompleteInput
        placeholder="search your tabs"
        variant="filled"
        onChange={props.onInputChange}
      />
      <AutoCompleteList>
        {Object.entries(continents).map(([continent, tabs], co_id) => {
          return (
            <AutoCompleteGroup key={co_id} showDivider>
              <AutoCompleteGroupTitle textTransform="capitalize">
                {continent}
              </AutoCompleteGroupTitle>
              {(tabs as Array<any>).map((tab, c_id) => {
                return (
                  <AutoCompleteItem
                    key={c_id}
                    value={tab.title}
                    textTransform="capitalize">
                    {tab.title}
                  </AutoCompleteItem>
                )
              })}
            </AutoCompleteGroup>
          )
        })}
      </AutoCompleteList>
    </AutoComplete>
  )
}

export default SinWindow
