import Organization from "../schema/organizationMongooseSchema";

class GetOrganizations {
  static async getAllOrganizations() {
    try {
      const organizations = await Organization.find({}).exec();
      return organizations;
    } catch (err) {
      return err;
    }
  }

  static async getOneOrganization(arg: Record<string, unknown>) {
    try {
      const organization = await Organization.findOne({
        organization: arg.organization,
      }).exec();
      return organization;
    } catch (err) {
      return err;
    }
  }
}

export default GetOrganizations;
