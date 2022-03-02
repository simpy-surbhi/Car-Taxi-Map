import * as React from "react";
import { ApiClient } from "../ApiClient";

export function useApiClient<T>(
  url: string,
  queryStringData?: { [key: string]: any }
): [{ data?: T; loading: boolean; error: string; refetch: () => void }] {
  const [data, setData] = React.useState<T>();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string>("");

  const loadData = React.useCallback(
    async function loadData() {
      try {
        const response = await ApiClient.get<T>(url, queryStringData);

        if (!response) {
          return;
        }
        setData(response);
      } catch (error) {
        setError(error instanceof Error ? error.message : "");
      } finally {
        setLoading(false);
      }
    },
    [url, queryStringData]
  );

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  return [{ data, loading, error, refetch: loadData }];
}
