import { useState } from "react"

function OptionsIndex() {
  const [data, setData] = useState([])

  return (
    <div>
      <h1>
        Welcome to your <a href="https://www.plasmo.com">Plasmo</a> Extension!
      </h1>
      <h2>This is the Option UI page!</h2>

      <div>
        <button
          onClick={() => {
            console.log("this is click")
            setData(["1231232"])
            chrome.tabs.query({}, function (tabs) {
              const urls = tabs.map((item) => {
                console.log(item.url)
                return item.url
              })
              setData(urls)
            })
          }}>
          hello
        </button>
      </div>

      {true &&
        data.map((item) => {
          return (
            <div>
              <a href={item} target="_blank">{item}</a>
            </div>
          )
        })}
    </div>
  )
}

export default OptionsIndex
