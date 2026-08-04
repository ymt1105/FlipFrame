import { useState } from "react";
import { EditOrderForm } from "./EditOrderForm";
import { editOrder } from "../../services/api";
import { Link } from "react-router-dom";

export const OrderCard = ({ orderData, itemInfo = {} }) => {
  const [currentOrder, setCurrentOrder] = useState(orderData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id, type, perTrade, platinum, quantity, rank, visible } = currentOrder;
  const { name, image, slug} = itemInfo;

  const handleSaveEditedOrder = async (updatedFormData) => {
    try {
      const updatedOrder = { ...currentOrder, ...updatedFormData };

      await editOrder(id, updatedOrder);

      setCurrentOrder(updatedOrder);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to update order:", err);
    }
  };

  return (
    <div className="bg-white p-4 border rounded shadow-md flex flex-col h-[300px] w-[550px] shrink-0 overflow-hidden">        
    <Link to={`/item/${slug}`} className="text-lg font-bold mb-2">{name}</Link>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <img className="max-w-40 object-contain" src={image} alt={name} />
        </div>
        <div className="text-sm space-y-1">
          <p><strong>Order Type:</strong> {type}</p>
          <p><strong>Per Trade:</strong> {perTrade}</p>
          <p><strong>Platinum:</strong> {platinum}p</p>
          <p><strong>Total Quantity:</strong> {quantity}x</p>
          <p><strong>Summed Total Price:</strong> {Number(platinum) * Number(quantity)}</p>
          <p><strong>Rank:</strong> {rank ?? "N/A"}</p>
          <p><strong>Visibility:</strong> {visible ? "True" : "False"}</p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-3 px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
          >
            Edit
          </button>

          {isModalOpen && (
            <EditOrderForm
              orderData={currentOrder}
              itemName={name}
              onClose={() => setIsModalOpen(false)}
              onComplete={handleSaveEditedOrder}
            />
          )}
        </div>
      </div>
    </div>
  );
};