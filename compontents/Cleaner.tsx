import { Button } from "@chakra-ui/react"
import _ from "lodash"

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

async function doIt() {
  const data = await groupByHost()
  for (let k of Object.keys(data)) {
    const tabIds = data[k].map((item) => item.id)
    await chrome.tabs.group({ tabIds })
  }
}

function Cleaner() {
  return (
    <div>
      <Button
        onClick={async () => {
          const data = await groupByHost()
          doIt()
        }}>
        一键整理
      </Button>
    </div>
  )
}

export default Cleaner
