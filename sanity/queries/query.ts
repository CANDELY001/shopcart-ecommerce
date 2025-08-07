import { defineQuery } from "next-sanity";

const BRANDS_QUERY = defineQuery(`*[_type=='brand'] | order(name asc) `);

const LATEST_BLOG_QUERY = defineQuery(
  ` *[_type == 'blog' && isLatest == true]|order(name asc){
      ...,
      blogcategories[]->{
      title
    }
    }`
);

const DEAL_PRODUCTS = defineQuery(
  `*[_type == 'product' && status == 'hot'] | order(name asc){
    ...,"categories": categories[]->title
  }`
);

const PRODUCT_BY_SLUG_QUERY = defineQuery(
  `*[_type == "product" && slug.current == $slug] | order(name asc) [0]`
);

const BRAND_QUERY = defineQuery(`*[_type == "product" && slug.current == $slug]{
  "brandName": brand->title
  }`);

const MY_ORDERS_QUERY =
  defineQuery(`*[_type == 'order' && clerkUserId == $userId] | order(orderData desc){
...,products[]{
  ...,product->
}
}`);
const GET_ALL_BLOG = defineQuery(
  `*[_type == 'blog'] | order(publishedAt desc)[0...$quantity]{
  ...,  
     blogcategories[]->{
    title
}
    }
  `
);

const SINGLE_BLOG_QUERY =
  defineQuery(`*[_type == "blog" && slug.current == $slug][0]{
  ..., 
    author->{
    name,
    image,
  },
  blogcategories[]->{
    title,
    "slug": slug.current,
  },
}`);

const BLOG_CATEGORIES = defineQuery(
  `*[_type == "blog"]{
     blogcategories[]->{
    ...
    }
  }`
);

const OTHERS_BLOG_QUERY = defineQuery(`*[
  _type == "blog"
  && defined(slug.current)
  && slug.current != $slug
]|order(publishedAt desc)[0...$quantity]{
...
  publishedAt,
  title,
  mainImage,
  slug,
  author->{
    name,
    image,
  },
  categories[]->{
    title,
    "slug": slug.current,
  }
}`);

const PRODUCT_REVIEWS_QUERY = defineQuery(`*[
  _type == "review" 
  && product._ref == $productId 
  && isApproved == true
] | order(createdAt desc) {
  _id,
  customerName,
  rating,
  title,
  comment,
  createdAt,
  isVerifiedPurchase,
  helpfulCount
}`);

const PRODUCT_REVIEW_STATS_QUERY = defineQuery(`{
  "totalReviews": count(*[_type == "review" && product._ref == $productId && isApproved == true]),
  "averageRating": math::avg(*[_type == "review" && product._ref == $productId && isApproved == true].rating),
  "ratingDistribution": {
    "5": count(*[_type == "review" && product._ref == $productId && isApproved == true && rating == 5]),
    "4": count(*[_type == "review" && product._ref == $productId && isApproved == true && rating == 4]),
    "3": count(*[_type == "review" && product._ref == $productId && isApproved == true && rating == 3]),
    "2": count(*[_type == "review" && product._ref == $productId && isApproved == true && rating == 2]),
    "1": count(*[_type == "review" && product._ref == $productId && isApproved == true && rating == 1])
  }
}`);

export {
  BRANDS_QUERY,
  LATEST_BLOG_QUERY,
  DEAL_PRODUCTS,
  PRODUCT_BY_SLUG_QUERY,
  BRAND_QUERY,
  MY_ORDERS_QUERY,
  GET_ALL_BLOG,
  SINGLE_BLOG_QUERY,
  BLOG_CATEGORIES,
  OTHERS_BLOG_QUERY,
  PRODUCT_REVIEWS_QUERY,
  PRODUCT_REVIEW_STATS_QUERY,
};
