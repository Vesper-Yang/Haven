import { useCallback, useState } from "react";
import { toast } from "sonner";

// TData: 代表成功后返回的数据必须是一个Promise,并且里面的数据类型是TData
// Targs: 代表调用这个Hook，需要传入的参数(Arguments)的类型必须是一个数组
type ServerAction<TData, Targs extends unknown[]> = (
  ...args: Targs
) => Promise<TData>;

// 我有useFetch函数。也是通用的，它也有两个‘待填空’的地方：TData 和 Targs
// 这个函数接收一个参数，叫做 serverAction
// 所有ServerAction函数应该遵循的“输入/输出”格式:类型必须符合上面定义的ServerAction<TData, Targs>

const useFetch = <TData, Targs extends unknown[]>(
  serverAction: ServerAction<TData, Targs>
) => {
  const [data, setData] = useState<TData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (...args: Targs) => {
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
    },
    [serverAction]
  );

  return { data, isLoading, error, execute, setData };
};

export default useFetch;

// 当调用 useFetch 时：useFetch(createEntry)
// TypeScript会非常智能地进行类型推断:
// 1. 先分析 createEntry 这个函数的类型
//    它发现 createEntry 接收 entrySchemaType，返回 Promise<Entry>。
// 2. 然后它会把这个具体的类型“代入”到 useFetch 的泛型“填空”里。
//     于是在这次 useFetch 的调用实例中，TypeScript 自动地知道了：
//     TData = Entry
//     Targs = [entrySchemaType]
// 一旦TypeScript 推断出了 TData 和 Targs 的具体类型，useFetch 内部的所有代码就都变得类型安全了。
