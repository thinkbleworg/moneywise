const DateUtils = {
  getMonthNameLong: (date, locale = "en-US") =>
    date.toLocaleString(locale, { month: "long" }),
  getDayNameLong: (date, locale = "en-US") =>
    date.toLocaleDateString(locale, { weekday: "long" }),
  getYear: (date) => date.getFullYear(),
  getDateDD: (date) => String(date.getDate()).padStart(2, "0"),
  getMonthMM: (date) => String(date.getMonth() + 1).padStart(2, "0"),
};

export default DateUtils;
