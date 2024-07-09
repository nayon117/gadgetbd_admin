"use client";

import { OrderItemType } from "@/lib/actions/shared.types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<OrderItemType>[] = [
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => {
      return (
        <Link
          href={`/admin/products/${row.original.product._id}`}
          className="primary-text-gradient"
        >
          {row.original.product.title}
        </Link>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
];
