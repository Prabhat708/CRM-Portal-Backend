import Navbar from "../components/Navbar";
import { useEffect, useState } from "react"; // State to store responses
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";

const Orders = () => {
  const API_URI = import.meta.env.VITE_API_BASE_URI;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newOrder, setnewOrder] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    product_name: "",
    price: "",
    quantity: "",
    order_date: "",
  });
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_URI}/api/orders/all`);
      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
      } else {
        console.error("Failed to fetch orders:", data.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setnewOrder({ ...newOrder, [name]: value });
  };
  const addOrder = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URI}/api/orders/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });
      const data = await res.json();
      console.log("success");
      if (data.success) {
        console.log("inside");
        fetchOrders();
        setnewOrder({
          name: "",
          email: "",
          phone: "",
          address: "",
          product_name: "",
          price: "",
          quantity: "",
          order_date: "",
        });
        alert("order added successfully!");
      } else {
        console.log("fail");
        console.error("Failed to add order:", data.error);
      }
    } catch (error) {
      console.log("error");
      console.error("Error adding order:", error);
    }
  };
  const generatePDF = async (orderId) => {
      // console.log(orderId)
      const response = await fetch(`${API_URI}/api/orders/${orderId}/invoice`);
      const data = await response.json();
      console.log(data);
      if (!data.success) {
        alert("Failed to fetch invoice");
        return;
      }
      console.log(data.order[0].order_id);
      // console.log(data.order[1].order_id)
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
    return <p className="text-center text-gray-600">Loading Orders...</p>;
  return (
    <>
      <Navbar isNavbarVisible={true} />
      <div className="p-8 mt-20">
        <h1 className="text-2xl font-bold mb-6">Orders</h1>
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Address</th>
                <th className="border p-2">Product Name</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Order Date</th>
                <th className="border p-2">Invoices</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice().sort((a, b) => new Date(b.order_date) - new Date(a.order_date)).map((order) => (
                <tr key={order.id} className="text-center border-b">
                  <td className="border p-2 capitalize">{order.name}</td>
                  <td className="border p-2">{order.email}</td>
                  <td className="border p-2">{order.phone}</td>
                  <td className="border p-2 capitalize">{order.address}</td>
                  <td className="border p-2 capitalize">{order.product_name}</td>
                  <td className="border p-2">{order.price}</td>
                  <td className="border p-2">{order.quantity}</td>
                  <td className="border p-2">{order.amount}</td>
                  <td className="border p-2">
                    {new Date(order.order_date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td><button
                      onClick={() => generatePDF(order.order_id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download w-4 h-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg>
                    </button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="p-8 mt-20">
        <h1 className="text-2xl font-bold mb-6">Add Orders</h1>
        <h3 className="text-xl font-bold mb-6">Fill Data for adding Orders</h3>
        <form onSubmit={addOrder} className="mb-6 flex flex-wrap gap-2">
          <input
            type="text"
            name="name"
            value={newOrder.name}
            onChange={handleInputChange}
            placeholder="Name"
            required
            className="border p-2"
          />
          <input
            type="email"
            name="email"
            value={newOrder.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
            className="border p-2"
          />
          <input
            type="text"
            name="phone"
            value={newOrder.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            required
            className="border p-2"
          />
          <input
            type="text"
            name="address"
            value={newOrder.address}
            onChange={handleInputChange}
            placeholder="Address"
            className="border p-2"
          />
          <input
            type="text"
            name="product_name"
            value={newOrder.product_name}
            onChange={handleInputChange}
            placeholder="Product Name"
            required
            className="border p-2"
          />
          <input
            type="number"
            name="price"
            value={newOrder.price}
            onChange={handleInputChange}
            placeholder="Price"
            required
            className="border p-2"
          />
          <input
            type="number"
            name="quantity"
            value={newOrder.quantity}
            onChange={handleInputChange}
            placeholder="Quantity"
            required
            className="border p-2"
          />
          <input
            type="date"
            name="order_date"
            value={newOrder.order_date}
            onChange={handleInputChange}
            placeholder="Order Date"
            required
            className="border p-2"
          />
          <button type="submit" className="bg-blue-500 text-white p-2">
            Add Order
          </button>
        </form>
      </div>
    </>
  );
};

export default Orders;
