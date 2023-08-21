/** panggil model member */
const {request, response} = require("express")
const adminModel = require(`../models/admin.model`)

/** memanggil file  crypto */
const crypt = require(`../crypt`)

/** request -> melihat data member
 * response -> menampilkan data member malalui view 
 */
exports.showDataAdmin = async (request, response) => {
    try {
        /** ambil data member menggunakan model */
        let dataAdmin = await adminModel.ambilDataAdmin()

        /** passing ke view */
        let sendData = {
            page: `admin`,
            data: dataAdmin,
            dataUser : request.session.dataUser
        }
        return response.render(`../views/index`, sendData)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** fungsi utk menampilkan form-apoteker utk tambah data */
exports.showTambahAdmin = async (request, response) => {
    try {
        /** prepare data yg akan dipassing
         * ke view
         */
        let sendData = {
            nama_admin: ``,
            username: ``,
            password: ``,
            page: `form-admin`,
            targetRoute: `/admin/add`,
            deskripsi: crypt.deskripsi, // kuning = function
            dataUser : request.session.dataUser
        }
        return response.render(`../views/index`, sendData)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** fungsi utk memproses data admin baru */
exports.prosesTambahData = async (request, response) => {
    try {
        /** membaca data dari yg diisikan user */
        let newData = {
            nama_admin: request.body.nama_admin,
            username: request.body.username,
            password: crypt.enkripsi(request.body.password)
        }
        /** eksekusi tambah data */
        await adminModel.tambahAdmin(newData)

        /** redirect(dialihkan) ke tampilan data pelanggan */
        return response.redirect(`/admin`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** fungsi untuk menampilkan data admin yang akan diubah */
exports.showEditAdmin = async(request, response) => {
    try {
        /** mendapatkan id dari admin yang akan diubah */
        let id = request.params.id
    
        /** menampung id ke dalam objek */
        let parameter = {
            id: id
        }
         /** ambil data sesuai parameter*/
         let admin = await adminModel.ambilDataDenganParameter(parameter)
         console.log(admin);
    
         /** prepare data yang akan ditampilkan view */
         let sendData = {
            nama_admin: admin[0].nama_admin,
            username: admin[0].username,
            password: admin[0].password,
            page: `form-admin`,
            targetRoute: `/admin/edit/${id}`,
            deskripsi: crypt.deskripsi, // kuning = function
            dataUser : request.session.dataUser
         }
    
         return response.render(`../views/index`, sendData)
    
    } catch (error) {
        let sendData = {
            message: error 
        }
        return response.render(`../views/error-page`, sendData)
    
    }
}


/** fungsi untuk memproses data yang diedit */
exports.prosesUbahData = async(request, response) => {
    try {
        /** mendapatkan id yang diubah */
        let id = request.params.id

        /** membungkus id ke bentuk objek */
        let parameter = {
            id: id 
        }

        /** menampung perubahan data ke dalam object */
        let perubahan = {
            nama_admin: request.body.nama_admin,
            username: request.body.username,
            password: crypt.enkripsi(request.body.password)
        }

        /** eksekusi perubahan data */
        await adminModel.ubahAdmin(perubahan, parameter)

        /** direct ke tampilan admin */
        return response.redirect(`/admin`)
    } catch (error) {
        let sendData = {
            message: error 
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** fungsi utk tombol hapus  */
exports.processDelete = async (request, response) => {
    try {
        /** read selected ID from URL parameter */
        let id = request.params.id
 
        /** store selected ID to object "parameter" */
        let parameter = {
            id: id // 'id' is similar as column's name of table
        }
 
        /** call function for delete data table of obat */
        await adminModel.delete(parameter)
 
        /** redirect to obat's page */
        return response.redirect(`/admin`)
 
    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
 }