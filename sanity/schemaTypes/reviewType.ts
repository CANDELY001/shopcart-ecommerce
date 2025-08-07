import { StarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const reviewType = defineType({
  name: "review",
  title: "Product Reviews",
  type: "document",
  icon: StarIcon,
  fields: [
    defineField({
      name: "product",
      title: "Product",
      type: "reference",
      to: { type: "product" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "customerName",
      title: "Customer Name",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(50),
    }),
    defineField({
      name: "customerEmail",
      title: "Customer Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(5),
      options: {
        list: [
          { title: "1 Star", value: 1 },
          { title: "2 Stars", value: 2 },
          { title: "3 Stars", value: 3 },
          { title: "4 Stars", value: 4 },
          { title: "5 Stars", value: 5 },
        ],
      },
    }),
    defineField({
      name: "title",
      title: "Review Title",
      type: "string",
      validation: (Rule) => Rule.required().min(5).max(100),
    }),
    defineField({
      name: "comment",
      title: "Review Comment",
      type: "text",
      validation: (Rule) => Rule.required().min(10).max(1000),
    }),
    defineField({
      name: "isVerifiedPurchase",
      title: "Verified Purchase",
      type: "boolean",
      description: "Was this review from a verified purchase?",
      initialValue: false,
    }),
    defineField({
      name: "isApproved",
      title: "Approved",
      type: "boolean",
      description: "Is this review approved for display?",
      initialValue: false,
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "helpfulCount",
      title: "Helpful Count",
      type: "number",
      description: "Number of people who found this review helpful",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "customerName",
      rating: "rating",
      productName: "product.name",
    },
    prepare(selection) {
      const { title, subtitle, rating, productName } = selection;
      const stars = "★".repeat(rating) + "☆".repeat(5 - rating);
      return {
        title: title,
        subtitle: `${stars} by ${subtitle} - ${productName}`,
      };
    },
  },
  orderings: [
    {
      title: "Created Date, Newest",
      name: "createdDateDesc",
      by: [{ field: "createdAt", direction: "desc" }],
    },
    {
      title: "Rating, Highest",
      name: "ratingDesc",
      by: [{ field: "rating", direction: "desc" }],
    },
  ],
});
