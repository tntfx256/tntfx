import type { Option } from "@tntfx/core";
import type { BoxProps } from "../src";
import { Box, Spacer, Text } from "../src";

export function Wrapper(props: BoxProps) {
  return <Box style={{ width: "100%", height: "100%" }} {...props} />;
}

export function TextContent() {
  return (
    <Box>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl
        aliquet nunc, quis aliquam nisl nunc ut nisi.
      </Text>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl
        aliquet nunc, quis aliquam nisl nunc ut nisi.
      </Text>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl
        aliquet nunc, quis aliquam nisl nunc ut nisi.
      </Text>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl
        aliquet nunc, quis aliquam nisl nunc ut nisi.
      </Text>
    </Box>
  );
}

export function InlineContent() {
  return (
    <Box
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "primary",
        flexDirection: "column",
      }}
    >
      <Text fontSize="xl">CONTENT</Text>
      <Spacer size="lg" />
      <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
    </Box>
  );
}

export function genOptions(idPrefix = "", nested = false): Option[] {
  return [
    { id: `${idPrefix}home`, title: "Home", icon: "home" },
    { id: `${idPrefix}about`, title: "About", icon: "user", children: nested ? genOptions(`${idPrefix}about-`) : undefined },
    { id: `${idPrefix}contact`, title: "Contact", icon: "email" },
    { id: `${idPrefix}news`, title: "News", icon: "rss", children: nested ? genOptions(`${idPrefix}news-`) : undefined },
    {
      id: `${idPrefix}blog`,
      title: "Blog",
      icon: "textFile",
      children: nested ? genOptions(`${idPrefix}blog-`) : undefined,
    },
  ];
}
