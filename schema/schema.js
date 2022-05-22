/* schema defines how GraphQL queries and mutations are structured and interlinked */
const graphql = require('graphql');
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLSchema, GraphQLNonNull } = graphql;
/* <<<<<< types convert JS data types into GraphQL-friendly types for compilation <<<<<<<<< */
const _ = require('lodash');

/* >> user-defined GraphQLObject type for author >> */
const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        /* >> create relation to post type >> */
        post: { type: new GraphQLList(PostType) },
    })
});
/* >> user-defined GraphQLObject type for post >> */
const PostType = new GraphQLObjectType({
    name: "Post",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        date: { type: GraphQLString },
        author: { type: GraphQLString },
        content: { type: GraphQLString },
    })
});

/* >> entry point Query type defined >> */
const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        author: {
            type: AuthorType,
            post: { type: PostType },
            /* >> create relation to author type >> */
            args: { id: { type: GraphQLID } },

        },
        post: {
            type: PostType,
            args: { 
                id: { type: GraphQLID },
                title: { type: GraphQLString },
                date: { type: GraphQLString }
            },
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
})
