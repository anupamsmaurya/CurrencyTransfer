const EXCHNAGE_APP_ID = 'd6f45ed8edce414ea27e8c1ebb1c5031'
const URL = 'https://openexchangerates.org/api/latest.json'

/**
 * Fetches currency coversion rates from openexchangerates.org
 * @return promise
 */
const getExhangeRatesService = async() => {
    const response = await fetch(`${URL}?app_id=${EXCHNAGE_APP_ID}`)
    return response.json()
}
export default getExhangeRatesService