import { useState } from "react";

// ChatGPT stuff lol, we shall still try it out and do some css fixing and use the props more dynamically

const FormModal = (props) => {
    const [productImage, setProductImage] = useState("");
    const [productName, setProductName] = useState("");
    const [productType, setProductType] = useState("Mens Top");
    const [quantity, setQuantity] = useState("");
    const [productDescription, setProductDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        // You can access form data in the state variables
    };

    return (
        <div className="modal">

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Product Image:</label>
                    <input
                    type="text"
                    placeholder="Enter URL or upload an image"
                    value={productImage}
                    onChange={(e) => setProductImage(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label>Product Name:</label>
                    <input
                    type="text"
                    placeholder="Enter product name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label>Product Type:</label>
                    <select
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                    >
                    <option value="Mens Top">Mens Top</option>
                    <option value="Mens Bottoms">Mens Bottoms</option>
                    <option value="Womens Top">Womens Top</option>
                    <option value="Womens Bottoms">Womens Bottoms</option>
                    </select>
                </div>
                <div className="input-group">
                    <label>Quantity:</label>
                    <input
                    type="text"
                    placeholder="Enter quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label>Product Description:</label>
                    <textarea
                    placeholder="Enter product description"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <input type="submit" value="Create Product" />
                </div>
            </form>
        </div>
    ); 
}

export default FormModal;