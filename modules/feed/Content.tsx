import { Text } from "react-native";
import * as React from "react";
import type { CustomTypes, Descendant } from "slate";

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
      <Text key={i} style={{ color: "#fff", marginLeft: 10 }}>
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
      return <strong key={i} children={(node as Text).text} />;
    }
    return <React.Fragment key={i} children={(node as Text).text} />;
  }

  throw new Error();
};

export const Content = React.memo(function Content(
  props: ContentProps
): JSX.Element {
  const { value, prefix } = props;
  const nodes = React.useMemo<Descendant[]>(() => JSON.parse(value), [value]);
  return (
    <React.Fragment>
      {nodes.map((node, i) => renderElement(node, i, prefix))}
    </React.Fragment>
  );
});
