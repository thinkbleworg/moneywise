//https://stackoverflow.com/a/37844673
const groupByPeriod = (obj, key = "date", period = "month") => {
  var byPeriod = {},
    oneDay = 1000 * 60 * 60 * 24;

  obj.forEach((value, index, arr) => {
    let dateObj = new Date(value[key] * 1000);
    if (period === "day") dateObj = Math.floor(dateObj.getTime() / oneDay);
    else if (period === "week")
      dateObj = Math.floor((dateObj.getTime() / oneDay) * 7);
    else if (period === "month")
      dateObj = (dateObj.getFullYear() - 1970) * 12 + dateObj.getMonth();
    else if (period === "year") dateObj = dateObj.getFullYear();

    byPeriod[dateObj] = byPeriod[dateObj] || {};
    byPeriod[dateObj]["date"] =
      byPeriod[dateObj]["date"] || new Date(value[key]).getTime();
    byPeriod[dateObj]["transactions"] = byPeriod[dateObj]["transactions"] || [];
    byPeriod[dateObj]["transactions"].push(value);
  });

  return byPeriod;
};

export default groupByPeriod;
