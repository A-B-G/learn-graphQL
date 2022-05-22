const mongoose = require('mongoose');
/* >> initialize schema >> */
const Schema = mongoose.Schema;
/* << schema creates structure for db tables << */

/* >> create schema for article >> */
const authorSchema = new Schema({
    id: String,
    name: String,
});
/* << << << */

module.exports = mongoose.model('Author', authorSchema);
