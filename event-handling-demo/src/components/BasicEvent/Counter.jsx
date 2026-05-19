import React, { useState } from "react";
import CounterButton from "./CounterButton";

function Counter() {
    const [count, setCount] = useState(0);
    // Event handler increment count

    const handelIncrement = () => {
        setCount(prevCount => prevCount + 1);
    }
    // Event handler decrement count
    const handleDecrement = () => {
        setCount(prevCount => prevCount - 1);
    }

    // Event handler to reset count;
    const handleRest = () => {
        setCount(0);

    }

    // Method 1 : function to accespt diffrent amount.

    const handleChangeBy = (amount) => {
        setCount(prevCount => prevCount + amount);
    }

    // Method 2 : Higher order function apporch

    const createHigherOrderChangeby = (amount) => {
        return () => setCount(prevCount => prevCount + amount);
    }

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Counter with custom Amount</h2>
            <div style={{ fontSize: '2rem', margin: '20px', color: count < 0 ? 'red' : 'black' }}>
                Count : {count}
            </div>
            <div>
                <div>

                    <CounterButton onBuuttonClick={() => handleChangeBy(1)} color="lightgreen">+1</CounterButton>

                    <CounterButton onBuuttonClick={() => handleChangeBy(5)} color="green">+5</CounterButton>

                    <CounterButton onBuuttonClick={() => handleChangeBy(10)} color="darkgreen">+10</CounterButton>
                </div>
                <div>

                    <CounterButton onBuuttonClick={() => handleChangeBy(-1)} color="orange">-1</CounterButton>

                    <CounterButton onBuuttonClick={() => handleChangeBy(-5)} color="orange">-5</CounterButton>

                    <CounterButton onBuuttonClick={() => handleChangeBy(-10)} color="red">-10</CounterButton>
                </div>
                <div>
                    <CounterButton onBuuttonClick={handleRest} color="gray">Reset</CounterButton>
                    <CounterButton onBuuttonClick={createHigherOrderChangeby(25)} color="purple">+25 HOF</CounterButton>
                </div>


                {/* <CounterButton onBuuttonClick={handelIncrement} color="green">+ Increment</CounterButton> */}
                {/* <CounterButton onBuuttonClick={handleDecrement} color="red">- Decrement</CounterButton>
                <CounterButton onBuuttonClick={handleRest} color="gray">Reset</CounterButton>
                <CounterButton onBuuttonClick={() => setCount(100)} color="purple">Set to 100</CounterButton>
                <CounterButton onBuuttonClick={() => setCount(prevCount => prevCount * 2)} color="orange">Double the Value</CounterButton>*/}
            </div>
        </div >
    );
}

export default Counter;