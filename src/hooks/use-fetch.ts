import { useState } from "react";
import { toast } from "sonner";

type ServerAction<TData, Targs extends any[]> = (
  ...args: Targs
) => Promise<TData>;

const useFetch = <TData, Targs extends any[]>(
  serverAction: ServerAction<TData, Targs>
) => {
  const [data, setData] = useState<TData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const execute = async (...args: Targs) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await serverAction(...args);
      setData(result);
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, execute, setData };
};

export default useFetch;
