import { fetchAll, fetchByName } from "./api.js"
import { removeCountries, debounce } from "./util.js"

const countryList = document.querySelector('.country__list')

const renderCountries = (countries) => {

    removeCountries(countryList)

    countries.forEach(country => {

        const template = document.getElementById('countryTemplate')

        const clon = template.content.cloneNode(true)
        clon.querySelector('.country__name').textContent = country.name.common
        clon.querySelector('.country__flag').textContent = country.flag
        
        if(country.languages) {
            let countryLang = clon.querySelector('.country__languages')            
            countryLang.textContent = `Languages: ${Object.values(country.languages).join(', ')}`
        }
        
        countryList.appendChild(clon)
    })
    
}

const filterCountriesByName = (e) => {
    e.preventDefault()
    const name = e.target.value
    if(name === '') {
        fetchAll().then(renderCountries)
    } else {
        fetchByName(name).then(renderCountries)
    }
}


fetchAll().then(renderCountries)

document.getElementById('searchName').addEventListener('keydown', debounce((e) => filterCountriesByName(e), 500))

// more lines!