/**
 * Compare two object together
 * @param {object} one First Object you want to compare
 * @param {object} two Second Object you want to compare
 * @return {boolean} True if not different - False if different
 */
const compare = (one, two) => {
  // Get all key of both object
  const keysOne = Object.keys(one)
  const keysTwo = Object.keys(two)

  // Compare keys
  const keysDiff = keysOne.filter(e => !keysTwo.includes(e)).length

  // Get all value of both object
  const valuesOne = Object.values(one).map(e => e.toLowerCase().trim())
  const valuesTwo = Object.values(two).map(e => e.toLowerCase().trim())

  //Compare values
  const valuesDiff = valuesOne.filter(e => !valuesTwo.includes(e)).length

  return keysDiff === 0 && valuesDiff === 0
}

module.exports = compare
