const removeCountries = (countryList) => {
    // while (countryList.firstChild) countryList.removeChild(countryList.firstChild)   // non performant
    countryList.innerHTML=''
}

const debounce = (callback, wait) => {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        callback(...args);
      }, wait);
    };
}

export { removeCountries, debounce }