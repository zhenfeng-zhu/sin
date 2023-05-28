import {
  CloseIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  MinusIcon
} from "@chakra-ui/icons"
import {
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  IconButton,
  Link,
  List,
  ListItem,
  Text
} from "@chakra-ui/react"
import { useEffect, useState } from "react"

function SinTab() {
  const [data, setData] = useState({})

  useEffect(() => {
    chrome.tabs.query({}, function (tabs) {
      let m = {}

      tabs
        .map((item) => {
          return {
            tab: item,
            url: new URL(item.url)
          }
        })
        .forEach((value, index) => {
          if (Object.keys(m).includes(value.url.hostname)) {
            m[value.url.hostname].push(value)
          } else {
            m[value.url.hostname] = [value]
          }
        })

      setData(m)
    })
  }, [])

  return (
    <Container borderWidth="1px" borderRadius="lg">
      <Heading>All your open tabs!</Heading>
      <List spacing={2}>
        {Object.keys(data)
          .sort()
          .map((item) => {
            try {
              return (
                <ListItem borderWidth="1px" borderRadius="lg" overflow="hidden">
                  <Box px={1} bgColor={"#457b9d"}>
                    <Flex>
                      <Box width={"400px"} overflow={"hidden"}>
                        <Text fontSize="xl" as="b" color={"white"}>
                          {item}
                        </Text>
                      </Box>
                      <Center>
                        <IconButton
                          aria-label="close tab"
                          size="xs"
                          variant="outline"
                          colorScheme="#e63946"
                          icon={<CloseIcon />}
                          onClick={() => {
                            data[item].forEach((e) => {
                              chrome.tabs.remove(e.tab.id)
                            })
                            window.location.reload()
                          }}></IconButton>
                      </Center>
                    </Flex>
                  </Box>

                  <Divider p="2px" />

                  <List spacing={3}>
                    {data[item]
                      .sort((a, b) => {
                        return a.tab.title >= b.tab.title ? -1 : 1
                      })
                      .map((i) => {
                        return (
                          <ListItem>
                            <Box px={1}>
                              <Flex color="white">
                                <IconButton
                                  variant="ghost"
                                  icon={<HamburgerIcon />}
                                  size="xs"
                                  colorScheme={"teal"}
                                  aria-label="open the tab"
                                  onClick={async () => {
                                    const currWindow =
                                      await chrome.windows.getCurrent()
                                    if (currWindow.id == i.tab.windowId) {
                                      chrome.tabs.update(i.tab.id, {
                                        active: true
                                      })
                                    } else {
                                      chrome.windows.update(
                                        i.tab.windowId,
                                        { focused: true },
                                        function () {
                                          chrome.tabs.update(i.tab.id, {
                                            active: true
                                          })
                                        }
                                      )
                                    }
                                  }}
                                />
                                <Box width={"400px"} overflow={"hidden"}>
                                  <Link
                                    href={i.url.href}
                                    color={"green"}
                                    isExternal>
                                    <Text
                                      fontSize="md"
                                      noOfLines={1}
                                      color={"black"}>
                                      {i.tab.title}
                                      <ExternalLinkIcon
                                        color={"black"}
                                        mx="2px"
                                      />
                                    </Text>
                                  </Link>
                                </Box>

                                <Center bg="white">
                                  <IconButton
                                    aria-label="close tab"
                                    size="xs"
                                    variant="ghost"
                                    colorScheme="red"
                                    icon={<MinusIcon />}
                                    onClick={() => {
                                      chrome.tabs.remove(i.tab.id)
                                      window.location.reload()
                                    }}
                                  />
                                </Center>
                              </Flex>
                            </Box>
                          </ListItem>
                        )
                      })}
                  </List>
                </ListItem>
              )
            } catch (error) {
              console.log(error)
            }
          })}
      </List>
    </Container>
  )
}

export default SinTab
