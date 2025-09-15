import { useState } from "react";
import { toast } from "sonner";

const useFetch = (serverAction: any) => {
  const [data, setData] = useState<any | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const execute = async (...args: any[]) => {
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
