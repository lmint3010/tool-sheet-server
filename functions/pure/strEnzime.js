const enzimeRegex = /[\s_\W]/g

module.exports = str => str.replace(enzimeRegex, '')