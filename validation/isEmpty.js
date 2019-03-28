module.exports = data => (
  data === undefined ||
  data === null ||
  (typeof data === 'object' && JSON.stringify(data) === '{}') ||
  (typeof data === 'object' && JSON.stringify(data) === '[]') ||
  (typeof data === 'string' && data.trim().split('').length === 0)
)