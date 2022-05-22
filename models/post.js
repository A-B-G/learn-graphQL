const mongoose = require('mongoose');
/* >> initialize schema >> */
const Schema = mongoose.Schema;
/* << schema creates structure for db tables << */

/* >> create schema for article >> */
const postSchema = new Schema({
    id: String,
    title: String,
    date: String,
    author: String,
    content: String
})
/* << << << */

module.exports = mongoose.model('Post', postSchema);
