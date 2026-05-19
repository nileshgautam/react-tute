import React from "react";

function CounterButton({ onBuuttonClick, children, color = 'blue' }) {
    return (
        <button
            onClick={onBuuttonClick}
            style={{
                backgroundColor: color,
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                margin: '5px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold'

            }}
        >
            {children}
        </button>
    );
}

export default CounterButton;