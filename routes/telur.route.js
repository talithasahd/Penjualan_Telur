/** load express js */
const express = require(`express`)

/** create object of express */
const app = express()

/** load obat controller */
const telurController = require(`../controllers/telur.controller`)

/** allow route to read urlencoded data */
app.use(express.urlencoded({ extended: true }))

/** load authorization from middleware */
// const authorization =
// require(`../middleware/authorization`)

/** create route for access telur's data */
app.get("/", telurController.showDataTelur)

/** export object "app" to another file */
module.exports = app

/** create route for show add telur view */
app.get("/add", telurController.showAddPage)

/** create route for process of add new obat */
app.post("/add", telurController.processInsert)

/** create route for show edit obat view */
app.get("/edit/:id", telurController.showEditPage)
/** :id -> name of paramter URL */

/** create route for process edit obat */
app.post("/edit/:id", telurController.processUpdate)
/** :id -> name of paramter URL */

/** create route for process delete obat */
app.get("/delete/:id", telurController.processDelete)
/** :id -> name of paramter URL */