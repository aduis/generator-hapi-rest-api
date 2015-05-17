module.exports = {
    server: {
        port: '<%= port %>',
        options: {}
    },
    mongo: {
        uri: process.env.DB_PORT ? process.env.DB_PORT.replace('tcp', 'mongodb') : '<%= dbinstance %>',
        db: process.env.environment === 'test' ? '<%= dbcollection %>test' : '<%= dbcollection %>'
    }
};
