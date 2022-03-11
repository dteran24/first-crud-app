import './Styling/style.css';
import React,{useState, useEffect} from 'react';
import axios from 'axios';

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);
  const [showEmployeeList, setShowEmployeeList] = useState(false)

  const addEmployee = (e) =>{
    e.preventDefault();
    
    axios.post('http://localhost:3001/create', {
      
      firstName: firstName,
      lastName: lastName,
      email: email,
      position: position,
      salary: salary,
    
    }).then(() => {
      setEmployeeList([...employeeList, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      position: position,
      salary: salary,

      }])
    });
  
  }
  useEffect(() =>{
    getEmployees();
  },[setEmployeeList])

   async function getEmployees(){
    const response = await axios.get('http://localhost:3001/employees');
    setEmployeeList(response.data)
    }
  
  
  console.log(showEmployeeList);
  return (
    
    <div className="App">
      <form onSubmit={addEmployee}>
        <div className="inputs">
        <label htmlFor="firstName">First Name: </label>
        <input name="firstName" type ="text" onChange={(event) => setFirstName(event.target.value)} required/>
        
        <label htmlFor="lastName">Last Name: </label>
        <input name="lastName" type ="text" onChange={(event) => setLastName(event.target.value)} required/>
        
        <label htmlFor="email">Email: </label>
        <input name="email" type ="email" onChange={(event) => setEmail(event.target.value)} required/>
        
        <label htmlFor="position">Position: </label>
        <input name="position" type ="text" onChange={(event) => setPosition(event.target.value)} required/>

        <label htmlFor="salary">Salary: </label>
        <input name="salary" type ="number" onChange={(event) => setSalary(event.target.value)} required/>
        </div>
        
        <input type ="submit" value="Add Employee" id="submit"/>
        <button onClick={() =>setShowEmployeeList(!showEmployeeList)}>Show Employees</button>
      </form>
      
      {showEmployeeList? <div className='employeeListContainer'>
        <ul>
        {employeeList.map(employee => 
          <li key={employee.id}>
            <div><strong>First Name:</strong>{employee.firstName} <strong>Last Name:</strong> {employee.lastName}</div> 
            <div><strong>Email:</strong>{employee.email} <strong>Position:</strong>{employee.position}<strong>Salary:</strong>${employee.salary}</div>
            </li>)}
        </ul>
      </div>: null}
    </div>
  );
}

export default App;
