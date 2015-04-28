//todo: insert placholders

module.exports = {
    server: {
        port: '8600',
        options: {}
    },
    mongo: {
        uri: process.env.DB_PORT ? process.env.DB_PORT.replace('tcp', 'mongodb') : 'mongodb://192.168.100.100:27017',
        db: process.env.environment === 'test' ? 'productapitest' : 'productapi'
    }
};
