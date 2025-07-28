import AddToWishlistButton from "@/components/AddToWishlistButton";
import NoAccessToCart from "@/components/NoAccessToCart";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const WishListPage = async () => {
  const user = await currentUser();
  return (
    <>
      {user ? (
        <AddToWishlistButton />
      ) : (
        <NoAccessToCart details="Log in to view your wishlist items. Don’t miss out on your cart products to make the payment!" />
      )}
    </>
  );
};

export default WishListPage;
