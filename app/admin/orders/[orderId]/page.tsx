import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/shared/OrderItemsColumn";

const OrderDetails = async ({ params }: { params: { orderId: string } }) => {
  const res = await fetch(
    `${process.env.ADMIN_DASHBOARD_URL}/api/orders/${params.orderId}`
  );
  const { orderDetails, customer } = await res.json();

  const { street, city, state, postalCode, country } =
    orderDetails.shippingAddress;

  return (
    <div className="flex flex-col gap-5 p-10">
      <p className="font-bold">
        Order ID: <span className="font-medium">{orderDetails._id}</span>
      </p>
      <p className="font-bold">
        Customer name: <span className="font-medium">{customer.name}</span>
      </p>
      <p className="font-bold">
        Shipping address:{" "}
        <span className="font-medium">
          {street}, {city}, {state}, {postalCode}, {country}
        </span>
      </p>
      <p className="font-bold">
        Total Paid:{" "}
        <span className="font-medium">${orderDetails.totalAmount}</span>
      </p>
      <p className="font-bold">
        Shipping rate ID:{" "}
        <span className="font-medium">{orderDetails.shippingRate}</span>
      </p>
      <DataTable
        columns={columns}
        data={orderDetails.products}
        searchKey="product"
      />
    </div>
  );
};

export default OrderDetails;
