/**function untuk CRUD */

/**load dulu connection dari config */
const connection = require(`../config`)

/** membuat nama table */
const tableName = `member`

exports.findAll = () => {
    return new Promise((resolve, rejected) => {
        /** define query to get all data */
        let query = `select * from ${tableName}`

        /** show query as log in console */
        console.log(`Run: ${query}`)

        /** run query */
        connection.query(query, (error, result) => {
            if (error) {
                /** reject with error message */
                rejected(error)
            }

            /** return resolve with data */
            resolve(result)
        })
     })
 }

/**function untuk ambil data customer */
exports.ambilDataMember = () => {
    return new Promise((resolve, reject) => {
        /**buat query untuk ambil data */
        let query = `select * from member`

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

        let query = `select * from member where ${params}`

        /**jalankan query nya */
        connection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}

/** function utk menambah data customer baru  */
exports.tambahMember = (member) => {
    return new Promise((resolve, rejected) => {
        /** ambil key dari object member */
        let key = Object
            .keys(member) // [key1,key2,dst]
            .join() // "key1,key2,dst"

        /** ambil value dari object member */
        let value = Object
            .keys(member) // [key1,key2,dst]
            .map(item => `"${member[item]}"`) // untuk scanning, ["value1","value2",dst]
            .join() // `"values1","value2",dst`

        let query = `insert into member (${key}) values (${value})`

        /** jalankan query-nya */
        connection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}

/** buat fungsi untuk update data customer */
exports.ubahMember = (data, parameter) => {
    return new promise((resolve, reject) => {
        /** menyusun string untuk query bagian
         * perubahan data
         */
        let perubahanData = Object
            .keys(data) //[nama,alamat,telepon]
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
        let query = `update customer set ${perubahanData} where ${params}`

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
        let query = `delete from ${tableName} where ${params}`

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