const mongoose = require('mongoose')

module.exports = (uri) =>{
    mongoose.connect(uri).then(
    () => { console.log('conneect database success!')},
    err => { console.log(err) }
    );
}
