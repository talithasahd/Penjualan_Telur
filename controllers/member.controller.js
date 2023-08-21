/** panggil model member */
const memberModel = require(`../models/member.model`)

/** request -> melihat data member
 * response -> menampilkan data member malalui view 
 */
exports.showDataMember = async (request, response) => {
    try {
        /** ambil data member menggunakan model */
        let dataMember = await memberModel.ambilDataMember()

        /** passing ke view */
        let sendData = {
            page: `member`,
            data: dataMember
        }
        return response.render(`../views/index`, sendData)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** fungsi utk menampilkan form-member utk tambah data */
exports.showTambahMember = async (request, response) => {
    try {
        /** prepare data yg akan dipassing
         * ke view
         */
        let sendData = {
            nama_member: ``,
            alamat: ``,
            telepon: ``,
            page: `form-member`,
            targetRoute: `/member/add`,
            dataUser: request.session.datauser
        }
        return response.render(`../views/index`, sendData)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** fungsi utk memproses data member baru */
exports.prosesTambahData = async (request, response) => {
    try {
        /** membaca data dari yg diisikan user */
        let newData = {
            nama_member: request.body.nama_member,
            alamat: request.body.alamat,
            telepon: request.body.telepon
        }
        /** eksekusi tambah data */
        await memberModel.tambahMember(newData)

        /** redirect(dialihkan) ke tampilan data pelanggan */
        return response.redirect(`/member`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** fungsi untuk menampilkan data member yang akan diubah */
exports.showEditMember = async(request, response) => {
    try {
        /** mendapatkan id dari member yang akan diubah */
        let id = request.params.id
    
        /** menampung id ke dalam objek */
        let parameter = {
            id: id
        }
         /** ambil data sesuai parameter*/
         let customer = await memberModel.ambilDataDenganParameter(parameter)
    
         /** prepare data yang akan ditampilkan view */
         let sendData = {
            nama_member: member[0].nama_member,
            alamat: member[0].alamat,
            telepon: member[0].telepon,
            page: `form-member`,
            targetRoute: `/member/edit/${id}`
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
            nama_member: request.body.nama_member,
            alamat: request.body.alamat,
            telepon: request.body.telepon
        }

        /** eksekusi perubahan data */
        await memberModel.ubahMember(perubahan, parameter)

        /** direct ke tampilan member */
        return response.redirect(`/member`)
    } catch (error) {
        let sendData = {
            message: error 
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// * fungsi utk tombol hapus  */
exports.processDelete = async (request, response) => {
    try {
        /** read selected ID from URL parameter */
        let id = request.params.id
 
        /** store selected ID to object "parameter" */
        let parameter = {
            id: id // 'id' is similar as column's name of table
        }
 
        /** call function for delete data table of obat */
        await memberModel.delete(parameter)
 
        /** redirect to telur's page */
        return response.redirect(`/member`)
 
    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
 }