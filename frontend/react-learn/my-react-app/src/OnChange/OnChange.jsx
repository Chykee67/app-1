import {useState} from 'react';

export function CheckOut(){
    //states to hold checkout options
    const [item, setItem] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [comment, setComment] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Select a payment method');
    const [deliveryMethod, setDeliveryMethod] = useState('Pick Up');

    
    return (
        <div>
            <h1>Check Out</h1>
            <input 
                type="text" 
                placeholder="Enter item title" 
                value={item} 
                onChange={(e) => setItem(e.target.value)} 
            />
            <p>Item: {item}</p>

            <input 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(e.target.value)} 
            />
            <p>Quantity: {quantity}</p>

            <textarea 
                placeholder="Extra delivery instructions"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <p>Extra delivery instructions: {comment}</p>

            <select onChange={(e) => setPaymentMethod(e.target.value)} value={paymentMethod}>
                <option value="Select a payment method">Select a payment method</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="PayPal">PayPal</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="Cryptocurrency">Cryptocurrency</option>
                <option value="Gift Card">Gift Card</option>
            </select>
            <p>Payment Method: {paymentMethod}</p>

            <label>
                <input 
                    type="radio" 
                    value="Pick Up" 
                    checked={deliveryMethod === 'Pick Up'} 
                    onChange={(e) => setDeliveryMethod(e.target.value)} 
                />
                Pick Up
            </label><br/>
            <label>
                <input 
                    type="radio" 
                    value="Home Delivery" 
                    checked={deliveryMethod === 'Home Delivery'} 
                    onChange={(e) => setDeliveryMethod(e.target.value)} 
                />
                Home Delivery
            </label>
            <p>
                <button onClick={(e) => {
                    e.preventDefault();
                    confirm(`Item: ${item}, Quantity: ${quantity}, Comment: ${comment}, Payment Method: ${paymentMethod}, Delivery Method: ${deliveryMethod}`);
                }}>
                    Confirm Order
                </button>
            </p>
        </div>
    )
}