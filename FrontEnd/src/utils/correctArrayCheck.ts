export function isEqual(a: any, b: any): boolean {
  if (a === undefined && b === undefined) {
    return true;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    const uniqueItemsA = new Set(a);
    const uniqueItemsB = new Set(b);
    return uniqueItemsA.size === uniqueItemsB.size && uniqueItemsA.size === a.length;
  }
  if (typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) {
      return false;
    }
    for (const key of keysA) {
      if (!isEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return a === b;
}
