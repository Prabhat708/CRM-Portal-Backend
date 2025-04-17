import Navbar from "../components/Navbar";
import { useEffect, useState } from "react"; // State to store responses
import { jsPDF } from "jspdf";

const Customers = () => {
  const API_URI = import.meta.env.VITE_API_BASE_URI;
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null); // Stores the selected customer for "View More"

  // Fetch Customers Data
  const fetchCustomers = async () => {
    try {
      const response = await fetch(`${API_URI}/api/customers/all`);
      const data = await response.json();
      if (data.success) {
        setCustomers(data.customers);
      } else {
        alert("Failed to fetch customers:", data.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Orders of a Particular Customer
  const fetchCustomerOrders = async (customerId) => {
    try {
      const response = await fetch(
        `${API_URI}/api/customers/${customerId}/orders`
      );
      const data = await response.json();
      if (data.success) {
        setSelectedCustomer({ ...data.customer, orders: data.orders });
      } else {
        console.error("Failed to fetch orders:", data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const generatePDF = async (orderId) => {
    const response = await fetch(`${API_URI}/api/orders/${orderId}/invoice`);
    const data = await response.json();
    if (!data.success) {
      alert("Failed to fetch invoice");
      return;
    }
    const doc = new jsPDF();
    doc.text(`Invoice for Order #${data.order[0].order_id}`, 10, 10);
    doc.text(`Customer Name: ${data.order[0].name}`, 10, 20);
    doc.text(`Phone: ${data.order[0].phone}`, 10, 30);
    doc.text(`Email: ${data.order[0].email}`, 10, 40);
    doc.text(`Address: ${data.order[0].address}`, 10, 50);
    doc.text(`Product Name: ${data.order[0].product_name}`, 10, 60);
    doc.text(`Price: Rs. ${data.order[0].price}`, 10, 70);
    doc.text(`Quantity: ${data.order[0].quantity}`, 10, 80);
    doc.text(`Total Amount: Rs. ${data.order[0].amount}`, 10, 90);
    doc.text(`Order Date: ${new Date(data.order[0].order_date).toLocaleDateString("en-GB", {day: "2-digit",month: "2-digit",year: "numeric",})}`,10,100);
    doc.save(`Invoice_${data.order[0].order_id}.pdf`);
  };

  if (loading)
    return <p className="text-center text-gray-600">Loading customers...</p>;

  return (
    <>
      <Navbar isNavbarVisible={true} />
      <div className="p-8 mt-20">
        <h1 className="text-2xl font-bold mb-6">Customers</h1>
        {customers.length === 0 ? (
          <p className="text-gray-500">No Customers found.</p>
        ) : (
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Address</th>
                <th className="border p-2">Number of Orders</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="text-center border-b">
                  <td className="border p-2 capitalize">{customer.name}</td>
                  <td className="border p-2">{customer.email}</td>
                  <td className="border p-2">{customer.phone}</td>
                  <td className="border p-2 capitalize">{customer.address}</td>
                  <td className="border p-2">
                    {customer.purchase_history
                      ? customer.purchase_history.split(",").length
                      : 0}
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => fetchCustomerOrders(customer.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      View More
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* View More Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Customer Details</h2>
            <p className="capitalize">
              <strong>Name:</strong> {selectedCustomer.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedCustomer.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedCustomer.phone}
            </p>
            <p className="capitalize">
              <strong>Address:</strong> {selectedCustomer.address}
            </p>
            <p>
              <strong>Created On:</strong>{" "}
              {new Date(selectedCustomer.created_at).toLocaleDateString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                }
              )}
            </p>
            <p>
              <strong>Number of Orders:</strong>{" "}
              {selectedCustomer.orders.length}
            </p>

            <h3 className="text-lg font-semibold mt-4">Order Details:</h3>
            {selectedCustomer.orders.length > 0 ? (
              <ul className="list-disc pl-6">
                {selectedCustomer.orders.map((order) => (
                  <li key={order.order_id}>
                    <strong>Order ID:</strong> {order.order_id},
                    <p className="capitalize inline">
                      <strong>Product Name:</strong> {order.product_name}
                    </p>
                    ,<strong>Price:</strong> {order.price},
                    <strong>Quantity:</strong> {order.quantity},
                    <strong> Amount:</strong> ₹{order.amount},
                    <strong> Date:</strong>{" "}
                    {new Date(order.order_date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                    , &nbsp;&nbsp;
                    <button
                      onClick={() => generatePDF(order.order_id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Download invoice
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No orders found.</p>
            )}

            <button
              onClick={() => setSelectedCustomer(null)}
              className="bg-red-500 text-white px-3 py-1 rounded mt-4 hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Customers;
