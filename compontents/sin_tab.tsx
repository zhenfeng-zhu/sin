import {
  CheckCircleIcon,
  CloseIcon,
  ExternalLinkIcon,
  MinusIcon,
  SmallCloseIcon
} from "@chakra-ui/icons"
import {
  Badge,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  IconButton,
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
                  <Box px={1}>
                    <Flex>
                      <Box width={"400px"} overflow={"hidden"}>
                        <Badge fontSize="xl" colorScheme="blue">
                          {item}
                        </Badge>
                      </Box>
                      <Center>
                        <IconButton
                          aria-label="close tab"
                          size="xs"
                          variant="outline"
                          colorScheme="red"
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

                  <List spacing={3} >
                    {data[item]
                      .sort((a, b) => {
                        return a.tab.title >= b.tab.title ? -1 : 1
                      })
                      .map((i) => {
                        return (
                          <ListItem>
                            <Box px={1}>
                              <Flex color="white">
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
