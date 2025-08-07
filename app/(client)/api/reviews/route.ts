import { backendClient } from "@/sanity/lib/backendClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, customerName, customerEmail, rating, title, comment } =
      body;

    console.log("Received review submission:", {
      productId,
      customerName,
      customerEmail,
      rating,
      title,
      comment,
    });

    // Validate required fields
    if (
      !productId ||
      !customerName ||
      !customerEmail ||
      !rating ||
      !title ||
      !comment
    ) {
      console.log("Validation failed: Missing required fields");
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      console.log("Validation failed: Invalid rating range");
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Create review document in Sanity
    const reviewDoc = {
      _type: "review",
      product: {
        _type: "reference",
        _ref: productId,
      },
      customerName,
      customerEmail,
      rating,
      title,
      comment,
      isVerifiedPurchase: false, // You can implement verification logic later
      isApproved: true, // Auto-approve for immediate display
      createdAt: new Date().toISOString(),
      helpfulCount: 0,
    };

    console.log("Creating review document:", reviewDoc);

    const result = await backendClient.create(reviewDoc);

    console.log("Review created successfully:", result._id);

    return NextResponse.json(
      {
        message: "Review submitted successfully!",
        reviewId: result._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      {
        error: `Failed to submit review: ${error instanceof Error ? error.message : "Unknown error"}`,
      },
      { status: 500 }
    );
  }
}
