import { useCallback, useState } from "react";

type Comparator<T> = (a: T, b: T) => boolean;

export function useCollection<T>(comparator?: Comparator<T>) {
  const [collection, setCollection] = useState<T[]>([]);

  const add = useCallback(
    (item: T) => {
      setCollection((collection) => [
        ...collection.filter((cItem) => (comparator ? !comparator(cItem, item) : cItem !== item)),
        item,
      ]);
    },
    [comparator]
  );

  const remove = useCallback(
    (item: T) => {
      setCollection((collection) =>
        collection.filter((colItem) => (comparator ? !comparator(colItem, item) : colItem !== item))
      );
    },
    [comparator]
  );

  const has = useCallback(
    (item: T) => {
      return collection.findIndex((colItem) => (comparator ? comparator(colItem, item) : colItem === item)) !== -1;
    },
    [collection, comparator]
  );
  const clear = useCallback(() => {
    setCollection([]);
  }, []);

  return { items: collection, add, remove, has, clear };
}
