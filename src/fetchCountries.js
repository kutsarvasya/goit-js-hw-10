export function fetchCountries(name) {
    return fetch(name).then(res=>res.json())
}