const fs = require('fs')
const path = require('path')
const pdf = require('pdf-parse')
pdf.disableFontFace = true

const folderPath = __dirname + '/pdf/'
const keyword = process.argv[2]

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error(err)
    return
  }

  files.forEach(file => {
    const filePath = path.join(folderPath, file)
    if (path.extname(filePath).toLowerCase() === '.pdf') {
      searchInPDF(filePath, keyword)
    }
  })
})

function searchInPDF(filePath, keyword) {
  const dataBuffer = fs.readFileSync(filePath)
  pdf(dataBuffer).then(data => {
    const text = data.text
    const regex = new RegExp(keyword, 'gi') // 'gi' mengaktifkan pencarian global dan case-insensitive

    if (regex.test(text)) {
      console.log(`Kata kunci '${keyword}' ditemukan di file: ${filePath}`)
    }
  })
}
