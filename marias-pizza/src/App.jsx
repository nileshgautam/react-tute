import React, { useState } from 'react';
import './App.css';

function App() {
  // Customer information state
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    isDelivery: true
  });

  // Pizza customization state
  const [pizzaOrder, setPizzaOrder] = useState({
    size: "medium",
    crust: "regular",
    toppings: [],
    specialInstructions: ''
  });

  // UI state for form behaviour
  const [formState, setFormState] = useState({
    errors: {},
    isSubmitting: false,
    showOrderSummary: false,
    currentErrors: {}
  });

  //Price Calculation function

  const calculateTotalPrice = () => {
    let total = 0;

    const sizePrices = {
      small: 12.99,
      medium: 15.99,
      large: 18.99,
      xlarge: 21.99
    }

    // Add base pizza price
    total += sizePrices[pizzaOrder.size];

    // Add crust upcharge
    const crustPrice = {
      regular: 0,
      thin: 1.00,
      thick: 2.00,
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

  const validateForm = () => {
    const errors = {};

    // validate Customer name 

    if (!customerInfo.name.trim()) {
      errors.name = "Please enter your full name";
    } else if (customerInfo.name.length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    // Validate phone number

    const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;

    if (!customerInfo.phone.trim()) {
      errors.phone = "Phone number is required";

    } else if (!phoneRegex.test(customerInfo.phone.replace(/\s/g, ''))) {
      errors.phone = "Please enter a valid phone number";
    }

    // Validation for email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerInfo.email.trim()) {
      errors.email = "Email address is required";

    } else if (!emailRegex.test(customerInfo.email.replace(/\s/g, ''))) {
      errors.email = "Please enter a valid email address";
    }

    // Validate delivery address

    if (customerInfo.isDelivery && !customerInfo.address.trim()) {
      errors.address = "Delivery address is required";
    }

    if (pizzaOrder.toppings.length === 0) {
      errors.toppings = "Please select at least one topping";
    }

    return errors;

  }
  const checkValidation = () => {
    const errors = validateForm();
    setFormState(prev => ({
      ...prev,
      currentErrors: errors
    }));

    return Object.keys(errors).length === 0;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = checkValidation();

    if (!isValid) {
      const firstError = document.querySelector('.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return;
    }

    setFormState(prev => ({
      ...prev,
      isSubmitting: true
    }));

    try {
      const orderData = {
        customer: customerInfo,
        pizza: pizzaOrder,
        total: calculateTotalPrice(),
        orderTime: new Date().toISOString(),
        estimatedDelivery: customerInfo.isDelivery ? '45-60 minutes' : '20-30 minutes'
      }

      console.log('Submitted Order data', orderData);

      alert(`Order placed successfully 
        
        Order #${Math.floor(Math.random() * 10000)}
        Total :$${calculateTotalPrice()}
        ${customerInfo.isDelivery ? `Delivery to ${customerInfo.address}` : 'Ready for pickup at Mario\'s Pizza'} 
        Thank you , ${customerInfo.name}! Your delicious pizza is being prepared,
        `);

      setCustomerInfo({
        name: '',
        phone: '',
        email: '',
        address: '',
        isDelivery: true
      });

      setPizzaOrder({
        size: 'medium',
        crust: 'regular',
        toppings: [],
        specialInstructions: ''
      });

      setFormState(prev => ({
        ...prev,
        isSubmitting: false
      }));


    } catch (error) {
      console.error('Form submitssion failed', error);
      alert('Sorry, there was a problem placing your order. Plase try again or call Mario\'s place order 5555-555-555')

    }
  };

  return (
    <div className='App'>
      <header>
        <h1>Maria's - Online ordering</h1>
        <p>Authentic Brooklyn Pizza Since 1952</p>
      </header>

      <main>
        <form className='pizza-order-form' onSubmit={handleSubmit}>
          <h2>Place your order</h2>

          <section className='customer-info'>
            <h3>Customer Information</h3>
            <div className="form-group">
              <label htmlFor="customer-name">Full Name</label>
              <input type="text" name='name' id='customer-name'
                value={customerInfo.name}
                onChange={(e) => {
                  setCustomerInfo({ ...customerInfo, name: e.target.value });

                  if (formState.currentErrors.name) {
                    setFormState(prev => ({
                      ...prev,
                      currentErrors: { ...prev.currentErrors, name: '' }
                    }));
                  }

                }}

                onBlur={checkValidation}
                className={formState.currentErrors.name ? 'error' : ''}

                placeholder='Enter your full name'
                required
              />
              {formState.currentErrors.name && (

                <span className="error-message">
                  {formState.currentErrors.name}
                </span>

              )}
            </div>
            <div className="form-group">
              <label htmlFor="customer-phone">Phone Number</label>
              <input type="tel" name='phone' id='customer-phone'
                value={customerInfo.phone}
                placeholder='(555) 123-4567'

                onChange={(e) => {
                  setCustomerInfo({ ...customerInfo, phone: e.target.value });

                  if (formState.currentErrors.phone) {
                    setFormState(prev => ({
                      ...prev,
                      currentErrors: { ...prev.currentErrors, phone: '' }
                    }));
                  }
                }}

                onBlur={checkValidation}
                className={formState.currentErrors.phone ? 'error' : ''}

                required
              />
              {formState.currentErrors.phone && (

                <span className="error-message">
                  {formState.currentErrors.phone}
                </span>

              )}

            </div>
            <div className="form-group">
              <label htmlFor="customer-email">Email Address</label>
              <input type="email" name='email' id='customer-email'
                value={customerInfo.email}
                onChange={(e) => {
                  setCustomerInfo({ ...customerInfo, email: e.target.value });

                  if (formState.currentErrors.email) {
                    setFormState(prev => ({
                      ...prev,
                      currentErrors: { ...prev.currentErrors, email: '' }
                    }));
                  }

                }}
                onBlur={checkValidation}
                className={formState.currentErrors.email ? 'error' : ''}



                placeholder='your.email@email.com'
                required
              />
              {formState.currentErrors.email && (

                <span className="error-message">
                  {formState.currentErrors.email}
                </span>

              )}
            </div>
            <div className="form-group">
              <label htmlFor="customer-address">Delivery Address</label>
              <textarea type="address" name='address' id='customer-address'
                value={customerInfo.address}
                onChange={(e) => {
                  setCustomerInfo({ ...customerInfo, address: e.target.value });

                  if (formState.currentErrors.address) {

                    setFormState(prev => ({
                      ...prev,
                      currentErrors: { ...prev.currentErrors, address: '' }
                    }));
                  }
                }}
                onBlur={checkValidation}
                className={formState.currentErrors.address ? 'error' : ''}
                placeholder='123 main st, Brooklyn, NY 10001'
                rows="3"
                required
              />
              {formState.currentErrors.address && (

                <span className="error-message">
                  {formState.currentErrors.address}
                </span>

              )}
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
                    Delivery (45-60 minutes)
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
                <option value="thick">Thick Crust (+$2.00)</option>
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

                            setFormState(prev => ({
                              ...prev,
                              currentErrors: {
                                ...prev.currentErrors,
                                toppings: ""
                              }
                            }));


                          }}

                          onBlur={checkValidation}
                        />
                        {topping.charAt(0).toUpperCase() + topping.slice(1)}

                      </label>
                    ))
                  }


                </div>
                <div>
                  {formState.currentErrors.toppings && (
                    <span className="error-message">
                      {formState.currentErrors.toppings}
                    </span>
                  )}
                </div>



                <div className="form-group">
                  <label htmlFor="special-instruction">
                    Special Instructions (Optional)
                  </label>

                  <textarea name="special-instruction" id="specialInstruction"
                    value={pizzaOrder.specialInstructions}
                    onChange={(e) => (setPizzaOrder({
                      ...pizzaOrder,
                      specialInstructions: e.target.value
                    }))}
                    placeholder='Any special request > (e.g extra crispy, light sauce, etc.)'
                    rows='3'
                    maxLength="200"
                  />
                  <small className='characters-count'>{pizzaOrder.specialInstructions.length} / 200 characters</small>
                </div>

              </fieldset>
            </div>


          </section>

          <section className='order-summary'>

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
                    medium: 15.99,
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

          <button type='submit' className='submit-btn' disabled={formState.isSubmitting}>

            {
              formState.isSubmitting ? (
                <span className='loading-spinner'>Processing Order...</span>

              ) : (
                `Place Order - ${calculateTotalPrice()}
                `)
            }


          </button>

        </form>


      </main>
    </div >
  )
}

export default App;