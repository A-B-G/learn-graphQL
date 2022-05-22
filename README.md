# MongDB and GraphQL  

## Resolvers with GraphQL Tools

To respond to queries, a schema needs resolvers for all fields, added separately from the GraphQL schema language. Each GraphQL Object Type should have a resolverMap object (a map of resolvers). 

Resolvers are functions with: 

* a parent object
* arguments
* executon context

Each resolver returns a result for its field. 

(see more [here](https://www.graphql-tools.com/docs/resolvers))

## Methods

* `find()` - called on the `Collection` object that references the collection you want to query. Example to find orders by Lemony Snicket on the `orders` collection:

```JavaScript
const findResult = await orders.find({
    name: "Lemony Snicket"
})
```

(see more [here](https://www.mongodb.com/docs/drivers/node/v3.6/fundamentals/crud/read-operations/retrieve/))

## Queries

Query for data that exactly matches a value provided in the query document. A **literal value query** has two parts:  

1. a field name
2. a value

Example to use a literal query to search for documents containing a field called "name" with a value of "apples":

```JavaScript
const query = { "name": "apples" };
```

(see more [here](https://www.mongodb.com/docs/drivers/node/v3.6/fundamentals/crud/query-document/))

