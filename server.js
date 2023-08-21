/** load library express */
const express = require(`express`)

/** instance "app" object */
const app = express()

/** define port for the server */
const PORT = `8001`

/** set view engine to ejs */
app.set(`view engine`, `ejs`)

/** load library express-session */
const session= require("express-session")

/** session configuration */
app.use(session({
    secret: `cinta kamu`,
    resave: false,
    saveUnitialized: false
}))

/** load routes */
const telur = require(`./routes/telur.route`)
const pack = require(`./routes/pack.route`)
const member = require(`./routes/member.route`)
const admin = require(`./routes/admin.route`)
const auth = require(`./routes/auth.route`)
const transaksi = require(`./routes/transaksi.route`)
const cart = require(`./routes/cart.route`)

/** define prefix for route telur */
app.use(`/telur`, telur)

/** define provix untuk route pack */
app.use(`/pack`, pack)

/** define profix for route member */
app.use(`/member`, member)

/** define profix for route admin */
app.use(`/admin`, admin)

/** define profix for route auth */
app.use(`/auth`, auth)

/** define provix untuk transaksi */
app.use(`/transaksi`, transaksi)

/** define profix for route cart */
app.use(`/cart`, cart)

/** running web server based on defined PORT */
app.listen(PORT, () => {
    console.log(`Server Telur is running on port ${PORT}`);
})