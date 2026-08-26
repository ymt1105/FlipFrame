import { useState } from "react";

export const EditOrderForm = ({ orderData = {}, itemName, onClose, onComplete }) => {
  const { platinum, quantity, perTrade, rank, visible } = orderData;

  const [formData, setFormData] = useState({
    platinum: platinum ?? "",
    quantity: quantity ?? "",
    perTrade: perTrade ?? 1,
    rank: rank ?? "",
    visible: visible ?? false,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const qty = Number(formData.quantity);
    const perTrd = Number(formData.perTrade);

    if (!qty || qty <= 0) {
      setError("Quantity must be greater than 0.");
      return;
    }

    if (perTrd <= 0 || qty % perTrd !== 0) {
      setError(`Quantity (${qty}) must be divisible by Per Trade (${perTrd}).`);
      return;
    }

    onComplete(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl transition-all">
        <div className="flex items-center justify-between border-b pb-3 mb-4">
          <h2>{itemName}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 font-semibold"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 p-2.5 rounded border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Platinum</span>
            <input
              type="number"
              name="platinum"
              value={formData.platinum}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 border p-2 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Quantity</span>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 border p-2 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Per Trade</span>
            <input
              type="number"
              name="perTrade"
              value={formData.perTrade}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 border p-2 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Rank</span>
            <input
              type="number"
              name="rank"
              value={formData.rank}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 border p-2 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="visible"
              checked={Boolean(formData.visible)}
              onChange={handleChange}
              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <span className="text-sm font-medium text-gray-700">Visible</span>
          </label>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              Save Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};