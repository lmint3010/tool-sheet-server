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
  const keysDiff = keysOne.some(key => keysTwo.includes(key))

  // Get all value of both object
  const valuesOne = Object.values(one).map(e => e.toLowerCase().trim())
  const valuesTwo = Object.values(two).map(e => e.toLowerCase().trim())

  //Compare values
  const valuesDiff = valuesOne.some(e => valuesTwo.includes(e))

  return keysDiff && valuesDiff;
}

module.exports = compare
