export function difference(first: any[], second: any[]) {
  return first.filter(item => second.indexOf(item) < 0);
}
