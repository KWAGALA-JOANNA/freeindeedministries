import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [usd, setUsd] = useState('');
  const [ugx, setUgx] = useState('');
  const API_KEY = '776f1fa82446ad7a3ecf9138';
  const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

  useEffect(() => {
    // Fetch the exchange rate on component mount
    axios
      .get(API_URL)
      .then((response) => {
        const rate = response.data.conversion_rates.UGX;
        setExchangeRate(rate);
      })
      .catch((error) => console.error('Error fetching exchange rate:', error));
  }, []);

  const handleUsdChange = (e) => {
    const usdValue = e.target.value;
    setUsd(usdValue);
    setUgx((usdValue * exchangeRate).toFixed(2));
  };

  const handleUgxChange = (e) => {
    const ugxValue = e.target.value;
    setUgx(ugxValue);
    setUsd((ugxValue / exchangeRate).toFixed(2));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h2>Currency Converter</h2>
      {exchangeRate ? (
        <>
          <div>
            <label>USD:</label>
            <input
              type="number"
              value={usd}
              onChange={handleUsdChange}
              style={{ marginLeft: '10px', padding: '5px', width: '150px' }}
            />
          </div>
          <div style={{ marginTop: '15px' }}>
            <label>UGX:</label>
            <input
              type="number"
              value={ugx}
              onChange={handleUgxChange}
              style={{ marginLeft: '10px', padding: '5px', width: '150px' }}
            />
          </div>
          <p style={{ marginTop: '20px', fontStyle: 'italic' }}>
            1 USD = {exchangeRate} UGX
          </p>
        </>
      ) : (
        <p>Loading exchange rate...</p>
      )}
    </div>
  );
};

export default CurrencyConverter;
