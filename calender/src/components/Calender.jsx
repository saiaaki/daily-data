import React, { useState, useEffect } from 'react';

const MonthCards = () => {
  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  const [todoLists, setTodoLists] = useState(() => {
    const storedTodoLists = localStorage.getItem('todoLists');
    return storedTodoLists ? JSON.parse(storedTodoLists) : {};
  });

  const [selectedMonth, setSelectedMonth] = useState(null);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    localStorage.setItem('todoLists', JSON.stringify(todoLists));
  }, [todoLists]);

  const handleMonthClick = (month) => {
    setSelectedMonth(month);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleOkClick = () => {
    if (inputText.trim() !== '') {
      setTodoLists(prevTodoLists => ({
        ...prevTodoLists,
        [selectedMonth]: [...(prevTodoLists[selectedMonth] || []), inputText]
      }));
      setInputText('');
    }
  };

  return (
    <div className="month-cards-container">
      {months.map(month => (
        <div 
          key={month} 
          className={`month-card ${selectedMonth === month ? 'active' : ''}`}
          onClick={() => handleMonthClick(month)}
        >
          <h2>{month}</h2>
          {selectedMonth === month && (
            <div>
              <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
                placeholder="Enter your todo item"
              />
              <button onClick={handleOkClick}>OK</button>
              <ul>
                {todoLists[month]?.map((todo, index) => (
                  <li key={index}>{todo}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MonthCards;
