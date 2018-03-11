module.exports = (env) =>{
    let config = {}
    if(env == 'development'){
        config = {
            'MONGO_URI': 'mongodb://localhost/seatran',
            'db': 'dbDevelopment'
        }    
    }else{
        config = {
            'MONGO_URI': 'production' ,
            'db': 'dbProduction'
        }
    }
    return config
}

