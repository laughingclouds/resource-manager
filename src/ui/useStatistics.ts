import { useEffect, useState } from "react";

export function useStatistics(dataPointCount: number): Statistics[] {
  const [value, setValue] = useState<Statistics[]>([]);

  useEffect(() => {
    const unsub = window.electron.subscribeStatistics((stats) =>
      setValue((prev) => {
        return [...prev, stats];
      }),
    );

    return unsub;
  }, []);

  return value;
}
