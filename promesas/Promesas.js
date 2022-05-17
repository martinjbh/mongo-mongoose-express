
let compre = 13

let caramelos = new Promise(function (resolve, reject) {

    setTimeout(() => {
        if (compre >= 10) resolve(compre);

        else reject("erro")
    }, 2000)

})
console.log(caramelos)

// caramelos.then((value) => console.log(value))
caramelos.then((value) => console.log(value),(error) => console.log(error))
// .then((value) => console.log(value+ "ultimo"))
// .catch((err)=>console.log(err))


