// Reference URL
//https://gist.github.com/portapipe/a28cd7a9f8aa3409af9171480efcc090

import currencyData from "../constants/currency.json";

export const getAllCurrencies = () => {
  return currencyData.map((item, idx) => {
    let isSupported = item.name === "India";
    return {
      id: idx + 1,
      flagCode: item.isoAlpha2.toLowerCase(),
      displayName: `${item.name} ${item.currency.name}`,
      countryName: item.name,
      code: item.currency.code,
      symbol: item.currency.symbol,
      flagBase64: `data:image/png;base64,${item.flag}`,
      isSupported: isSupported,
    };
  });
};

export const filterCurrency = (list, searchCode) => {
  return list.filter(
    (item) =>
      item.displayName.toLowerCase().indexOf(searchCode.toLowerCase()) !== -1 ||
      item.code.toLowerCase().indexOf(searchCode.toLowerCase()) !== -1
  );
};

// To Display the flag, there are two options
// 1. https://flagpedia.net/download/api
// 2. Convert Base64 to image from currency.flagBase64

export const getBase64ImgElement = (flagBase64) => {
  let img = new Image();
  img.onload = function () {
    return img;
  };
  img.src = flagBase64;
};
