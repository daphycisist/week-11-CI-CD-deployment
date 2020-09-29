import { GraphQLString, GraphQLNonNull, GraphQLID } from "graphql";

const UserSchema = {
  id: { type: GraphQLID },  
  email: { type: GraphQLNonNull(GraphQLString), unique: true},
  password: { type: GraphQLNonNull(GraphQLString) }
};

export default UserSchema
