/** load model admin */
const adminModel = require(`../models/admin.model`)

/** load crypt */
const crypt = require(`../crypt`)
const { request, response } = require("express")

/** function untuk menampilkan halaman login */
exports.showLogin = (request, response) => {
    try {
        return response.render(`../views/pages/login`)
    } catch (error) {
        let sendData = {
            message: error 
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** function untuk authentication */
exports.authentication = async(request, response) => {
    try {
        /** tampung data username dan password yang diisikan */
        let username = request.body.username
        let password = request.body.password

        console.log(`${username } - ${password}`);
        /** check kecocokan username */
        let result = await adminModel.ambilDataDenganParameter({username: username})
        
        /** cek keberadaan data  */
        if(result.length > 0){
            console.log(result); /** isi result data admin yang sesuai (array) */
            /** kita cek dulu kecocokan passwordnya */
            /** 123 === deskripsi(fhbeuferuevbfuihgeuirgrui) */
            if(password === crypt.deskripsi(result[0].password)){
               /** login berhasil */
               /** menyimpan data user ke session */
               
               /** 'userData' = label of session  data yg disimpan data login*/
               request.session.dataUser = result[0]

               /** definisi cart di session */
               request.session.cart = []

               return response.redirect(`/telur`)
            }else{
                /** login gagal */
                return response.redirect(`/auth`)
            }
        }else{
            /** data admin tidak ada */
            return response.redirect(`/auth`)
        }

    } catch (error) {
        let sendData = {
            message: error 
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** membuat function untuk logout */
exports.logout = async (request, response) => {
    try {
        /** menghapus data user dari session */
        request.session.dataUser = undefined /** tidak dikenali */
        
        /** kembali ke halaman login */
        return response.redirect(`/auth`)
    } catch (error) {
        let sendData = {
            message: error 
        }
        return response.render(`../views/error-page`, sendData)
    }
}