const URI = 'https://restcountries.com/v3.1/'

const countryList = document.querySelector('.country__list')

const removeCountries = () => {
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


const fetchAll = async () => {
    const res = await fetch(`${URI}/all`)
    const data = await res.json()

    return data
}

const fetchByName = async (name) => {
    const res = await fetch(`${URI}/name/${name}`)
    const data = await res.json()
    return data
}


const renderCountry = (countries) => {
    removeCountries()
    countries.forEach(country => {
        const template = document.getElementById('countryTemplate')
        const clon = template.content.cloneNode(true)
        clon.querySelector('.country__name').textContent = country.name.common
        clon.querySelector('.country__flag').textContent = country.flag
        let countryLang = clon.querySelector('.country__languages')
        
        if(country.languages) {
            countryLang.textContent = `Languages: ${Object.values(country.languages).join(', ')}`
        }
        
        countryList.appendChild(clon)
    })
    
}

fetchAll().then(renderCountry)

document.getElementById('searchName').addEventListener('keydown', debounce((e) => {
    e.preventDefault()
    const name = e.target.value
    if(name === '') {
        fetchAll().then(renderCountry)
    } else {
        fetchByName(name).then(renderCountry)
    }
    
}, 300))

// more lines!