require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');

const app = express();

/* >> create db connection >> */
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => console.log("Connected to MongDB"));
/* << << << */

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(8000, () => console.log("learn graphql ~ hello from port 8000"));
