module.exports = {
    server: {
        port: '<%= port %>',
        options: {}
    },
    mongo: {
        uri: process.env.DB_PORT ? process.env.DB_PORT.replace('tcp', 'mongodb') : '<%= db_instance %>',
        db: process.env.environment === 'test' ? '<%= db_collection %>test' : '<%= db_collection %>'
    }
};
