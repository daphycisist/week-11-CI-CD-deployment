import { GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull } from "graphql";

const OrganizationSchema = {
  organization: { type: GraphQLNonNull(GraphQLString) },
  products: { type: GraphQLNonNull(GraphQLList(GraphQLString)) },
  marketvalue: { type: GraphQLNonNull(GraphQLInt) },
  address: { type: GraphQLNonNull(GraphQLString) },
  ceo: { type: GraphQLNonNull(GraphQLString) },
  country: { type: GraphQLNonNull(GraphQLString) },
  noOfEmployees: { type: GraphQLInt },
  employees: { type: GraphQLNonNull(GraphQLList(GraphQLString)) },
};


const updateOrganizationSchema = {
  organization: { type: GraphQLString },
  products: { type: GraphQLList(GraphQLString) },
  marketvalue: { type: GraphQLInt },
  address: { type: GraphQLString },
  ceo: { type: GraphQLString },
  country: { type: GraphQLString },
  noOfEmployees: { type: GraphQLInt },
  employees: { type: GraphQLList(GraphQLString) },
};



export {OrganizationSchema, updateOrganizationSchema};