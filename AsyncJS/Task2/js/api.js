const URI = 'https://restcountries.com/v3.1/'

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
export { fetchAll, fetchByName }