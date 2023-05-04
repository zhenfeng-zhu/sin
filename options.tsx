import { useEffect, useState } from "react"

function OptionsIndex() {
  const [data, setData] = useState({})

  useEffect(() => {
    chrome.tabs.query({}, function (tabs) {
      const urls = tabs.map((item) => {
        console.log(item.url)
        return {
          tab: item,
          url: new URL(item.url)
        }
      })
      let m = {}
      for (let u of urls) {
        if (Object.keys(m).includes(u.url.hostname)) {
          m[u.url.hostname].push(u)
        } else {
          m[u.url.hostname] = [u]
        }
      }
      setData(m)
    })
  }, [])

  return (
    <div>
      <h1>All your open tabs!</h1>

      {Object.keys(data)
        .sort()
        .map((item) => {
          try {
            return (
              <div>
                <h2>
                  {item}
                  <button
                    onClick={() => {
                      data[item].forEach((e) => {
                        chrome.tabs.remove(e.tab.id)
                      })
                    }}>
                    close all
                  </button>
                </h2>

                <div>
                  {data[item].sort().map((i) => {
                    return (
                      <div>
                        <a href={i.url.href} target="_blank">
                          {i.tab.title}
                        </a>
                        <button
                          onClick={() => {
                            chrome.tabs.remove(i.tab.id)
                          }}>
                          close
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          } catch (error) {
            console.log(error)
          }
        })}
    </div>
  )
}

export default OptionsIndex
