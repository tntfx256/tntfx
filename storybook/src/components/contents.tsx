import { Box, Divider, Text } from "@tntfx/components";
import type { Any, Option } from "@tntfx/core";

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
      <Text>CONTENT</Text>
      <Divider />
      <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
    </Box>
  );
}

export function ViewValue(props: { value: Any }) {
  return (
    <>
      <Divider />
      <Box>
        <pre>
          <code>{JSON.stringify(props.value, null, 2)}</code>
        </pre>
      </Box>
    </>
  );
}

export function genOptions(idPrefix = "", nested = false): Option[] {
  return [
    { id: `${idPrefix}home`, title: "Home", icon: "Home" },
    {
      id: `${idPrefix}about`,
      title: "About",
      icon: "Airplane",
      children: nested ? genOptions(`${idPrefix}about-`) : undefined,
    },
    { id: `${idPrefix}contact`, title: "Contact", icon: "Mail" },
    { id: `${idPrefix}news`, title: "News", icon: "News", children: nested ? genOptions(`${idPrefix}news-`) : undefined },
  ];
}
