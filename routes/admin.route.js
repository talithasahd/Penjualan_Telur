/** panggil express */
const express = require(`express`)

/** buat object `app */
const app = express()

/** minta izin utk membaca data yang dikirimkan melalui form */
app.use(express.urlencoded({ extended: true}))

/** panggil controller member */
const adminController = require(`../controllers/admin.controller`)
// const authorization = require(`../middleware/authorization`)

/** define route untuk akses data member */
app.get(`/`, adminController.showDataAdmin)

/** define route utk nampilin form admin */
app.get(`/add`, adminController.showTambahAdmin)

/** define route utk memproses tambah data admin */
app.post(`/add`, adminController.prosesTambahData)

/** define route untuk menampilkan form member 
 * dengan data yang akan diubah */
app.get(`/edit/:id`, adminController.showEditAdmin)

/** define route untuk memproses perubahan data */
app.post(`/edit/:id`, adminController.prosesUbahData)

/** create route utk proses hapus data admin */
app.get(`/delete/:id`, adminController.processDelete)

/** export object app */
module.exports = app