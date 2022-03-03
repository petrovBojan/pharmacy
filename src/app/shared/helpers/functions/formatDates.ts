export function formatDates(dateFrom, dateTo){
  let from = new Date(dateFrom);
  let objFrom = {day: from.getDate(), month: from.getMonth(), year: from.getFullYear()};
  let to = new Date(dateTo);
  let objTo = {day: to.getDate(), month: to.getMonth(), year: to.getFullYear()};
  if (objFrom.month === objTo.month && objFrom.year === objTo.year) {
    return 'd'
  }else if (objFrom.month !== objTo.month && objFrom.year === objTo.year) {
    return 'd MMM'
  } else if (objFrom.year !== objTo.year) {
    return 'd MMM, y'
  }
}
