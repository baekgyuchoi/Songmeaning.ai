import React from "react";
import {Progress} from "@nextui-org/react";

export default function LoadingProgressBar() {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 99 ? 99 : v + 1));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Progress
      aria-label="Analyzing Song Meaning..."
      size="lg"
      isStriped
      value={value}
      color="warning"
      showValueLabel={true}
      className="max-w-md"
    />
  );
}
