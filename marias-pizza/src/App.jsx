import React, { useState } from 'react';
import './App.css';

function App() {
  // Customer infromation state
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    isDelivery: true
  });

  // Pizza customizaion state
  const [pizzaOrder, setPizzaOrder] = useState({
    size: "medium",
    crust: "regular",
    toppings: [],
    specialInstruction: ''
  });

  // UI state for form behaviour
  const [formState, setFormState] = useState({
    errors: {},
    isSubmitting: false,
    showOrderSummary: false
  });

  //Price Calculation function

  const calculateTotalPrice = () => {
    let total = 0;

    const sizePrices = {
      small: 12.99,
      medium: 14.99,
      large: 18.99,
      xlarge: 21.99
    }

    // Add base pizza price
    total += sizePrices[pizzaOrder.size];

    // Add crust upcharge
    const crustPrice = {
      regular: 0,
      thin: 1.00,
      thik: 2.00,
      stuffed: 3.00
    }

    total += crustPrice[pizzaOrder.crust];

    // Add toppings ($1.50 each)

    total += pizzaOrder.toppings.length * 1.50;

    // Add delivery fee if applicable

    if (customerInfo.isDelivery) {
      total += 2.99
    }

    return total.toFixed(2);

  }

  return (
    <div className='App'>
      <header>
        <h1>Maria's - Online ordering</h1>
        <p>Authentic Brooklun Pizza Since 1952</p>
      </header>

      <main>
        <form className='pizza-order-form'>
          <h2>Place your order</h2>

          <section className='customer-info'>
            <h3>Customer Information</h3>
            <div className="form-group">
              <label htmlFor="customer-name">Full Name</label>
              <input type="text" name='name' id='customer-name'
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                placeholder='Enter your full name'
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="customer-phone">Phone Number</label>
              <input type="tel" name='phone' id='customer-phone'
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                placeholder='(555) 123-456'
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="customer-email">Email Address</label>
              <input type="email" name='email' id='customer-email'
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                placeholder='your.email@email.com'
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="customer-address">Delivery Address</label>
              <textarea type="address" name='address' id='customer-address'
                value={customerInfo.address}
                onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                placeholder='123 main st, Brooklyn, NY 10001'
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <fieldset>
                <legend>Order type</legend>
                <div className="radio-group">
                  <label>
                    <input type="radio"
                      name='orderType'
                      value="delivery"
                      checked={customerInfo.isDelivery === true}
                      onChange={(e) => setCustomerInfo({
                        ...customerInfo,
                        isDelivery: true
                      })}
                    />
                    Delivery (45-60 minutrs)
                  </label>

                  <label>
                    <input type="radio"
                      name='orderType'
                      value="pickup"
                      checked={customerInfo.isDelivery === false}
                      onChange={(e) => setCustomerInfo({
                        ...customerInfo,
                        isDelivery: false
                      })}
                    />
                    Pickup (20-30 minutes)
                  </label>

                </div>

              </fieldset>

            </div>
          </section>
          <section className='pizza-customization'>
            <h3>Build your pizza</h3>

            <div className="form-group">
              <label htmlFor="pizza-size">Pizza Size</label>
              <select
                name="size"
                id="pizza-size"
                value={pizzaOrder.size}
                onChange={(e) => setPizzaOrder({
                  ...pizzaOrder,
                  size: e.target.value
                })}

              >

                <option value="small">Small 10"-$12.99</option>
                <option value="medium">Medium 12"-$15.99</option>
                <option value="large">Large 14"-$18.99</option>
                <option value="xlarge">X-Large 16"-$21.99</option>

              </select>
            </div>
            <div className="form-group">
              <label htmlFor="pizza-crust">Crust Type</label>
              <select
                name="size"
                id="pizza-crust"
                value={pizzaOrder.crust}
                onChange={(e) => setPizzaOrder({
                  ...pizzaOrder,
                  crust: e.target.value
                })}

              >

                <option value="regular">Regular Crust</option>
                <option value="thin">Thin Crust (+$1.00) </option>
                <option value="thik">Thik Crust (+$2.00)</option>
                <option value="stuffed">Stuffed Crust (+$3.00)</option>
              </select>
            </div>

            <div className="form-group">
              <fieldset>
                <legend>Your Toppings (Each +$1.50)</legend>

                <div className="topping-grid">
                  {
                    [
                      "pepperoni",
                      "sausage",
                      "mushrooms",
                      "onions",
                      "green peppers",
                      "black olives",
                      "extra cheese",
                      "bacon",
                      "ham",
                      "pineapple",
                      "jalapeños",
                      "tomatoes",
                      "spinach",
                      "chicken"
                    ].map(topping => (
                      <label
                        key={topping} className='topping-option'
                      >
                        <input type="checkbox"
                          name='toppings'
                          value={topping}
                          checked={pizzaOrder.toppings.includes(topping)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setPizzaOrder({
                                ...pizzaOrder,
                                toppings: [...pizzaOrder.toppings, topping]
                              })
                            } else {
                              setPizzaOrder({
                                ...pizzaOrder,
                                toppings: pizzaOrder.toppings.filter(t => t !== topping)

                              })
                            }
                          }}
                        />
                        {topping.charAt(0).toUpperCase() + topping.slice(1)}

                      </label>
                    ))
                  }
                </div>

              </fieldset>
            </div>


          </section>

          <section className='order-summary'>
            <h3>Order Sunnary</h3>

            <section className="order-summary">
              <h3>Order Summary</h3>

              {/* Pizza */}
              <div className="summary-item">
                <span className="item-name">
                  {pizzaOrder.size.charAt(0).toUpperCase() + pizzaOrder.size.slice(1)} Pizza
                </span>

                <span className="item-price">
                  {(() => {
                    const sizePrices = {
                      small: 12.99,
                      medium: 14.99,
                      large: 18.99,
                      xlarge: 21.99,
                    };

                    const crustPrices = {
                      regular: 0,
                      thin: 1,
                      thick: 2,
                      stuffed: 3,
                    };

                    return `$${(
                      sizePrices[pizzaOrder.size] +
                      crustPrices[pizzaOrder.crust]
                    ).toFixed(2)}`;
                  })()}
                </span>
              </div>

              {/* Toppings */}
              {pizzaOrder.toppings.length > 0 && (
                <div className="summary-item">
                  <span className="item-name">
                    Toppings ({pizzaOrder.toppings.join(", ")})
                  </span>
                  <span className="item-price">
                    ${(pizzaOrder.toppings.length * 1.5).toFixed(2)}
                  </span>
                </div>
              )}

              {/* Delivery Fee */}
              {customerInfo.isDelivery && (
                <div className="summary-item">
                  <span className="item-name">Delivery Fee</span>
                  <span className="item-price">$2.99</span>
                </div>
              )}

              {/* Total */}
              <div className="summary-total">
                <span className="total-label">Total</span>
                <span className="total-price">
                  ${calculateTotalPrice()}
                </span>
              </div>

              {/* Customer Details */}
              {customerInfo.name && (
                <div className="customer-details">
                  <p>
                    <strong>Customer:</strong> {customerInfo.name}
                  </p>

                  {customerInfo.phone && (
                    <p>
                      <strong>Phone:</strong> {customerInfo.phone}
                    </p>
                  )}

                  {customerInfo.isDelivery ? (
                    <p>
                      <strong>Delivery To:</strong>{" "}
                      {customerInfo.address || "Address needed"}
                    </p>
                  ) : (
                    <p>
                      <strong>Pickup:</strong> Mario's Pizza (Est. time: 20–30 minutes)
                    </p>
                  )}
                </div>
              )}
            </section>
          </section>

          <button type='submit'>Place order - ${calculateTotalPrice()}</button>

        </form>


      </main>
    </div>
  )
}

export default App;