/**function untuk CRUD (create,read,update,delete)*/

/**load dulu connection dari config */
const connection = require(`../config`)

/** membuat nama tabel */
const namaTabel = `admin`

/**function untuk ambil data admin */
exports.ambilDataAdmin = () => {
    return new Promise((resolve, reject) => {
        /**buat query untuk ambil data */
        let query = `select * from admin`

        /**jalankan query nya */
        connection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}


/**function untuk ambil data berdasarkan parameter khusus */
exports.ambilDataDenganParameter = (parameter) => {
    return new Promise((resolve, reject) => {
        let params = Object
            .keys(parameter)
            .map(item => `${item}="${parameter[item]}"`)
            .join(` and `)

        let query = `select * from admin where ${params}`
        

        /**jalankan query nya */
        connection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}

/** function utk menambah data admin baru  */
exports.tambahAdmin = (admin) => {
    return new Promise((resolve, reject) => {
        /** ambil key dari object admin */
        let key = Object
            .keys(admin) // [key1,key2,dst]
            .join() // "key1,key2,dst"

        /** ambil value dari object admin */
        let value = Object
            .keys(admin) // [key1,key2,dst]
            .map(item => `"${admin[item]}"`) // untuk scanning, ["value1","value2",dst]
            .join() // `"values1","value2",dst`

        let query = `insert into admin (${key}) values (${value})`

        /** jalankan query-nya */
        connection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}

/** buat fungsi untuk update data admin */
exports.ubahAdmin = (data, parameter) => {
    return new Promise((resolve, reject) => {
        let perubahanData = Object
            .keys(data) //[nama,username,password]
            .map(item => `${item}="${data[item]}"`)
            .join()

        /** menyusun string untuk bagian query bagian
         * penentu data yang akan diubah
          */

        let params = Object
            .keys(parameter)
            .map(item => `${item}="${parameter[item]}"`)
            .join(` and `)

        /** susun query */
        let query = `update admin set ${perubahanData} where ${params}`

        /**jalankan query nya */
        connection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}

/** fungsi untuk button hapus */
exports.delete = (parameter) => {
    return new Promise((resolve, rejected) => {
        let params = Object
            .keys(parameter)
            .map(key => `${key}="${parameter[key]}"`)
            .join(" and ")

        /** create query for delete */
        let query = `delete from ${namaTabel} where ${params}`

        /** show query as log in console */
        console.log(`Run: ${query}`)

        /** run query */
        connection.query(query, (error, result) => {
            if (error) {
                /** reject with error message */
                rejected(error.message)
            }

            /** return resolve with data */
            resolve(result)
        })
    })
}