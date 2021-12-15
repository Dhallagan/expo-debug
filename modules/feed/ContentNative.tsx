import * as React from "react";

export function ContentSimple(props) {
  const { value, prefix } = props;

  const nodes = React.useMemo<Descendant[]>(() => JSON.parse(value), [value]);
}
