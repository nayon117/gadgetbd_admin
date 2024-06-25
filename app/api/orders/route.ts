

import { NextRequest, NextResponse } from "next/server";
import { format } from "date-fns";
import { connectToDatabase } from "@/lib/mongoose";
import Order from "@/database/models/order.model";
import Customer from "@/database/models/customer.model";

export const GET = async (req: NextRequest) => {
  try {
    await connectToDatabase()

    const orders = await Order.find().sort({ createdAt: "desc" })

    const orderDetails = await Promise.all(orders.map(async (order) => {
      const customer = await Customer.findOne({ clerkId: order.customerClerkId })
      return {
        _id: order._id,
        customer: customer.name,
        products: order.products.length,
        totalAmount: order.totalAmount,
        createdAt: format(order.createdAt, "MMM do, yyyy")
      }
    }))

    return NextResponse.json(orderDetails, { status: 200 });
  } catch (err) {
    console.log("[orders_GET]", err)
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export const dynamic = "force-dynamic";
