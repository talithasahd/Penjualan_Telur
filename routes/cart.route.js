const { prependListener } = require("../config")

/** panggil express */
const express = require(`express`)

/** bikin object express */
const app = express()

/** minta ijin untuk membaca data */
app.use(express.urlencoded({extended: true}))

/** panggil controller transaksi */
const transaksiController =
  require(`../controllers/transaksi.controller`)

/** panggil authorization dari middleware */
const authorization =
   require(`../middleware/authorization`)

/** definisikan route untuk cart */
app.post(`/`, authorization.cekUser, transaksiController.addToCart)

/** definisikan route untuk menghapus item pada cart */
app.get(`/:id`, authorization.cekUser, transaksiController.hapusCart)

/** export object app */
module.exports = app