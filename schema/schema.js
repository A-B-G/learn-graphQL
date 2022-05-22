/* schema defines how GraphQL queries and mutations are structured and interlinked */
const graphql = require('graphql');
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLSchema, GraphQLNonNull } = graphql;
/* <<<<<< types convert JS data types into GraphQL-friendly types for compilation <<<<<<<<< */
const _ = require('lodash');

const Author = require('../models/author');
const Post = require('../models/post');

/* >> user-defined GraphQLObject type for author >> */
const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        /* >> create relation to post type >> */
        post: { 
            type: new GraphQLList(PostType), 
            /* >> resolver for author GraphQL Object Type to respond to queries >> */
            resolve(parent, args) {
                /* >> result for post field, using mongoose model >> */
                return Post.findById(parent.id);
                /* << << << */
            }
        },
    })
});
/* << << << */

/* >> user-defined GraphQLObject type for post >> */
const PostType = new GraphQLObjectType({
    name: "Post",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        date: { type: GraphQLString },
        content: { type: GraphQLString },
        /* >> add author relation >> */
        author: { 
            type: AuthorType,
            /* >> resolver for post GraphQL Object Type to respond to queries >> */
            resolve(parent, args) {
                /* >> result for author field, using mongoose model >> */
                return Author.findById(parent.id);
                /* << << << */
            }
        },
    })
});
/* << << << */

/* >> entry point Query type defined >> */
const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        author: {
            type: AuthorType,
            /* >> create relation to post type >> */
            post: { type: PostType },
            /* << << << */
            args: { id: { type: GraphQLID } },
            /* >> resolver for query GraphQLObject Type >> */
            resolve(parent, args) {
                return Author.findById(args.id);
            }
            /* << << << */
        },
        post: {
            type: PostType,
            /* >> create relation to author type >> */
            author: { type: AuthorType },
            /* << << << */
            args: { 
                id: { type: GraphQLID },
                title: { type: GraphQLString },
                date: { type: GraphQLString }
            },
            /* >> resolver for query GraphQLObject Type >> */
            resolve(parent, args) {
                return Post.findById(args.id);
            }
            /* << << << */
        }
    }
});
/* >> entry point Mutation type defined >> */
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createPost: {
            type: PostType,
            args: {
                id: { type: GraphQLID },
                date: { type: GraphQLString },
                author: { type: GraphQLString },
                title: { type: GraphQLString },
                content: { type: GraphQLString },
            },
        /* >> resolver for mutation GraphQLObject Type >> */
        resolve(parent, args) {
            let post = new Post({
                title: args.title,
                date: args.date,
                author: args.author
            })
            return post.save();
        }
        },
        updatePost: {
            type: PostType,
            args: {
                id: { type: GraphQLID },
                date: { type: GraphQLString },
                author: { type: GraphQLString },
                title: { type: GraphQLString },
                content: { type: GraphQLString },
            }
        },
        deletePost: {
            type: PostType,
            args: {
                id: { type: GraphQLID },
            }
        },
        
    }

});
/* << << << */

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
