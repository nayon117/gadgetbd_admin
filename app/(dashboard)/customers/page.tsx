import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/shared/CustomerColumns";
import { Separator } from "@/components/ui/separator";
import Customer from "@/database/models/customer.model";
import { connectToDatabase } from "@/lib/mongoose";

const Customers = async () => {
  await connectToDatabase();

  const customers = await Customer.find().sort({ createdAt: "desc" });

  return (
    <div className="px-10 py-5">
      <p className="h1-bold">Customers</p>
      <Separator className="my-5 bg-gray-400" />
      <DataTable columns={columns} data={customers} searchKey="name" />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default Customers;
