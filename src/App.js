import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.length >= 3) {
        fetch(`https://student-finder-backend.vercel.app/api/students/search${searchTerm}`)
          .then(res => res.json())
          .then(data => setResults(data))
          .catch(err => console.error("Error:", err));
      } else {
        setResults([]);
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSelect = (student) => {
    setSelectedStudent(student);
    setResults([]);
    setSearchTerm('');
  };

  return (
    <div className="container">
      <h1>Student Finder</h1>
      
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search student name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        {results.length > 0 && (
          <ul className="dropdown">
            {results.map(student => (
              <li 
                key={student.rollNumber} 
                className="dropdown-item"
                onClick={() => handleSelect(student)}
              >
                <span>{student.name}</span>
                <span style={{color: '#94a3b8', fontSize: '0.9rem'}}>Roll: {student.rollNumber}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedStudent && (
        <div className="details-card">
          <div style={{textAlign: 'center', marginBottom: '20px'}}>
            <div style={{
              width: '60px', height: '60px', background: '#e0e7ff', 
              borderRadius: '50%', display: 'flex', alignItems: 'center', 
              justifyContent: 'center', margin: '0 auto 10px', color: '#4f46e5',
              fontSize: '1.5rem', fontWeight: 'bold'
            }}>
              {selectedStudent.name.charAt(0)}
            </div>
            <h2 style={{margin: 0}}>{selectedStudent.name}</h2>
          </div>

          <div className="detail-row">
            <span className="label">Class</span>
            <span className="value">{selectedStudent.class}th Grade</span>
          </div>
          <div className="detail-row">
            <span className="label">Roll Number</span>
            <span className="value">{selectedStudent.rollNumber}</span>
          </div>
          <div className="detail-row">
            <span className="label">Status</span>
            <span className="value" style={{color: '#10b981'}}>Active</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;