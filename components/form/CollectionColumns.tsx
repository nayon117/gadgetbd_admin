"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
import Link from "next/link";
import { CollectionType } from "@/lib/actions/shared.types";

export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/admin/collections/${row.original._id}`}
        className="primary-text-gradient"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => <p>{row.original.products.length}</p>,
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete item="collection" id={row.original._id} />,
  },
];
