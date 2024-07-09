"use client";

import { OrderColumnType } from "@/lib/actions/shared.types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<OrderColumnType>[] = [
  {
    accessorKey: "_id",
    header: "Order",
    cell: ({ row }) => {
      return (
        <Link
          href={`/admin/orders/${row.original._id}`}
          className="primary-text-gradient"
        >
          {row.original._id}
        </Link>
      );
    },
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "totalAmount",
    header: "Total ($)",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
];
