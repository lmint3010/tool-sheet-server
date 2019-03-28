const formatSheetContent = sheetContent => {
  while(!/^[eE]{1}[nN]{1}$/g.test(sheetContent[0][0])) {
    sheetContent.shift()
  }
  return sheetContent
}

module.exports = { formatSheetContent }