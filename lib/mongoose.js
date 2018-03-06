const mongoose = require('mongoose');
const config = require('../config/index');

mongoose.connect('mongodb://'+process.env.DB_URI, config.get('mongoose:options'));

module.exports = mongoose;
