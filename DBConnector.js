const mongoose = require('mongoose');
// 
class DBConnector {
    
    constructor(){
        this.connect();
    }

    connect() {
        const datasource = mongoose.connect('mongodb+srv://admin:admin@cluster0.fo9tb.mongodb.net/auth?retryWrites=true&w=majority');
        this.datasource = datasource;
    }

    getConnection(){
        return this.datasource;
    }
        
}
// Singleton
module.exports = new DBConnector();
