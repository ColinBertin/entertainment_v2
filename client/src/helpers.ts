export const getYear = (date: string) => {
  if (date) {
    return date.substring(0, 4);
  }
  return;
};

export type BaseItem = {
  [key: string]: string | number | BaseItem | boolean | Array<BaseItem>;
};

export function deepSearch<Item extends BaseItem>(
  items: Item[],
  searchTerm: string
): Item[] {
  // deep copy input array to avoid modifying it inadvertently
  const resItems: Item[] = JSON.parse(JSON.stringify(items));
  const searchRecursively = (item: BaseItem): boolean => {
    if (item === null) {
      return false;
    }
    return Object.entries(item).some(([key, value]) => {
      switch (true) {
        case Array.isArray(value): {
          const filteredChildren = (value as BaseItem[]).filter((e) =>
            searchRecursively(e)
          );
          item[key] = filteredChildren;
          return filteredChildren.length > 0;
        }
        case typeof value === "object": {
          return searchRecursively(value as BaseItem);
        }
        case ["string", "number", "symbol", "bigint", "boolean"].includes(
          typeof value
        ): {
          return value
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        }
      }

      return false;
    });
  };

  return resItems.filter((item) => searchRecursively(item));
}
