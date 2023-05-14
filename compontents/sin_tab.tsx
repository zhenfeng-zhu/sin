import {
  CheckCircleIcon,
  CloseIcon,
  ExternalLinkIcon,
  MinusIcon,
  SmallCloseIcon
} from "@chakra-ui/icons"
import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Link,
  List,
  ListIcon,
  ListItem,
  Square,
  Tag,
  TagCloseButton,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
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
          console.log(item.url)
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
                  <div>
                    <Tag size="lg" variant="solid" colorScheme="blue">
                      <TagLabel>{item}</TagLabel>
                      <TagCloseButton
                        onClick={() => {
                          data[item].forEach((e) => {
                            chrome.tabs.remove(e.tab.id)
                          })
                          window.location.reload()
                        }}></TagCloseButton>
                    </Tag>
                  </div>

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
                                <Center bg="white">
                                  <button
                                    onClick={() => {
                                      chrome.tabs.remove(i.tab.id)
                                      window.location.reload()
                                    }}>
                                    <ListIcon as={MinusIcon} color="red" />
                                  </button>
                                </Center>
                                <Box overflow={"hidden"}>
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
