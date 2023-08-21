/** panggil express */
const express = require(`express`)

/** buat object `app */
const app = express()

/** minta izin untuk membaca data yang dikirimkan melalui form */
app.use(express.urlencoded({extended: true}))

/** panggil controller member */
const memberController = require(`../controllers/member.controller`)
// const authorization = require(`../middleware/authorization`)

/** define route untuk akses data member */
app.get(`/`, memberController.showDataMember)

/** define route untuk menampilkan form member */
app.get(`/add`, memberController.showTambahMember)

/** define route untuk memproses tambah data member */
app.post(`/add`, memberController.prosesTambahData)

/** define route untuk menampilkan form member dengan data yang akan diubah */
app.get(`/edit/:id`, memberController.showEditMember)

/** define route untuk memproses perubahan data */
app.post(`/edit/:id`, memberController.prosesUbahData)

/** create route for process delete obat */
app.get("/delete/:id", memberController.processDelete)

/** export object app */
module.exports = app