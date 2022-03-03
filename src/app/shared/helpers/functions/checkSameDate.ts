export function datesAreOnSameDay (first, second) {
  first = new Date(first);
  second = new Date(second);
  return first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();
}
