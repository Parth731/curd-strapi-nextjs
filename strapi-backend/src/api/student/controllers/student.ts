/**
 * student controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::student.student",
  ({ strapi }: any) => ({
    async findOne(ctx) {
      const { id: slug } = ctx.params;
      const { query } = ctx;
      if (!query.filters) query.filters = {};
      query.filters.slug = { $eq: slug };
      console.log(query);
      const entity = await strapi.service("api::student.student").find(query);
      const { results }: any = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(results[0]);
    },
  })
);
