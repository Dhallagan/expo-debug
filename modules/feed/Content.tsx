import { Text, View } from "react-native";
import * as React from "react";
// import type { CustomTypes, Descendant } from "slate";

type Element = CustomTypes["Element"];
type Text = CustomTypes["Text"];

type ContentProps = {
  value: string;
  prefix?: React.ReactNode;
};

const renderElement = (
  node: Descendant,
  i: number,
  prefix?: React.ReactNode
): JSX.Element => {
  if ((node as Element).type === "paragraph") {
    return (
      <Text key={i} style={{ color: "#fff", fontSize: 16 }}>
        {i === 0 && prefix}
        {Array.isArray((node as Element).children)
          ? (node as Element).children.map(
              renderElement as (
                node: CustomTypes["Text"],
                i: number
              ) => JSX.Element
            )
          : undefined}
      </Text>
    );
  }

  if ((node as Text).text !== undefined) {
    if ((node as Text).bold) {
      return (
        <Text style={{ fontWeight: "bold" }} key={i}>
          {(node as Text).text.toLowerCase()}
        </Text>
      );
    }
    return (
      <React.Fragment key={i} children={(node as Text).text.toLowerCase()} />
    );
  }

  throw new Error();
};

export const Content = React.memo(function Content(
  props: ContentProps
): JSX.Element {
  const { value, prefix, sx } = props;
  const nodes = React.useMemo<any[]>(() => JSON.parse(value), [value]);
  return (
    <React.Fragment>
      <View style={sx}>
        {nodes.map((node, i) => renderElement(node, i, prefix))}
      </View>
    </React.Fragment>
  );
});
