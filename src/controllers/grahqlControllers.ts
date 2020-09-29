import Organization from "../schema/organizationMongooseSchema";
import Mutations from "../services/mutations";
import {
  OrganizationSchema,
  updateOrganizationSchema,
} from "../models/gqlOrganizationModel";
import UserSchema from "../models/userModel";
import GetOrganizations from "../services/getQuery";
import UserAuth from "../controllers/userAuth";

import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} from "graphql";

// Graphql Organization schema
const OrganizationType = new GraphQLObjectType({
  name: "Organization",
  fields: () => ({
    id: { type: GraphQLID },
    organization: { type: GraphQLString },
    products: { type: GraphQLList(GraphQLString) },
    marketvalue: { type: GraphQLFloat },
    address: { type: GraphQLString },
    ceo: { type: GraphQLString },
    country: { type: GraphQLString },
    noOfEmployees: { type: GraphQLInt },
    employees: { type: GraphQLList(GraphQLString) },
  }),
});

// User Type
const UserType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    token: { type: GraphQLString },
  }),
});

// Root Query to get one or all Organizations in the database
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    AllOrganizations: {
      type: new GraphQLList(OrganizationType),
      description:
        "This will return all the organization found in the database",
      resolve(_parent, args, context) {
        // UserAuth(context);
        return GetOrganizations.getAllOrganizations();
      },
    },

    OneOrganization: {
      type: OrganizationType,
      args: { organization: { type: GraphQLString } },
      resolve(_parent, args, context) {
        // UserAuth(context);
        return GetOrganizations.getOneOrganization(args);
      },
    },
  },
});

// Mutation to Add, update and delete organizations in the database
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    signup: {
      type: UserType,
      args: UserSchema,
      resolve(_parent, args) {
        const userInput = Mutations.signup(args);
        return userInput;
      },
    },

    login: {
      type: UserType,
      args: UserSchema,
      resolve(_parent, args) {
        const userInput = Mutations.login(args);
        return userInput;
      },
    },

    addOrganization: {
      type: OrganizationType,
      args: OrganizationSchema,
      resolve(_parent, args, context) {
        // UserAuth(context);
        const userInput =  Mutations.createOrganization(args);
        return userInput;
      },
    },

    updateOrganization: {
      type: OrganizationType,
      args: updateOrganizationSchema,
      resolve(_parent, args, context) {
        // UserAuth(context);
        const updatedOrganization = Mutations.updateOrganization(args);
        return updatedOrganization;
      },
    },

    deleteOrganization: {
      type: OrganizationType,
      args: updateOrganizationSchema,
      resolve(_parent, args, context) {
        // UserAuth(context);
        const deletedOrganization = Mutations.deleteOrganization(args);
        return deletedOrganization;
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
