import React, { useState } from 'react'; 
import axios from 'axios';

const App = () => {
  const [company, setCompany] = useState('');
  const [bodytype, setBodytype] = useState('');
  const [fromcity, setFromcity] = useState('');
  const [tocity, setTocity] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passengerPrice, setPassengerPrice] = useState('');
  const [bookingSuccessful, setBookingSuccessful] = useState(false);

  // const handleGetPrice = () => {
  //   axios.post('/getPrice', { company, bodytype, fromcity, tocity })
  //     .then(res => setPassengerPrice(res.data.price))
  //     .catch(err => console.error(err));
  // };

  const handleGetPrice = () => {

    if (tocity === fromcity) {
      console.error('To city cannot be the same as from city');
      alert('The city you want to arrive in cannot be the same as the city you will be departing from. Please select a different city to arrive in.');
      return;
    }

    
    console.log(company, bodytype, fromcity, tocity);
    axios.post('/getPrice', { company, bodytype, fromcity, tocity })
      .then(res => {
        if (res.data && res.data.price) {
          setPassengerPrice(res.data.price);
        } else {
          console.error('Invalid response from server: no price found');
        }
      })
      .catch(err => console.error(err));
  };
  

  const handleAddPassenger = () => {
    axios.post('/addPassenger', { name, email, company, bodytype, fromcity, tocity, price: passengerPrice })
    .then(res => {
      console.log(res.data);
      setBookingSuccessful(true);
    })
    .catch(err => console.error(err));
    };
    
    return (
    <div>

      <h1 style={{ fontSize: '2rem', textAlign: 'center' }}>!! Welcome to the Plane Renting System !!</h1>

      <h3> We have 3 companies available: Boeing, Airbus & Embraer </h3>
      <h3> We have 2 types of aircrafts available, based on their size: Medium & Wide </h3>
      <h3> Our operations are based in 5 cities: London, New York, Delhi, Canberra & Tokyo </h3>

      <h2>Please enter the specifics to know the price</h2>

    <form>

    <label>
    Select your preferred company:
    
    <select value={company} defaultValue={company} onChange={(selectedOption) => setCompany(selectedOption.target.value)}>
      <option value="Boeing">Boeing</option>
      <option value="Airbus">Airbus</option>
      <option value="Embraer">Embraer</option>
    </select>
    </label><br/><br/>

    <label>
    Select the aircraft body type, based on the number of passengers:

    {/* <input type="text" value={bodytype} onChange={e => setBodytype(e.target.value)} /> */}

    <select value={bodytype} onChange={(selectedOption) => setBodytype(selectedOption.target.value)} >
      <option value="Medium">Medium</option>
      <option value="Wide">Wide</option>
    </select>

    </label><br/><br/>

    <label>
    Departing from:

    {/* <input type="text" value={fromcity} onChange={e => setFromcity(e.target.value)} /> */}

    <select value={fromcity} onChange={(selectedOption) => setFromcity(selectedOption.target.value)} >
      <option value="London">London</option>
      <option value="New York">New York</option>
      <option value="Delhi">Delhi</option>
      <option value="Canberra">Canberra</option>
      <option value="Tokyo">Tokyo</option>
    </select>

    </label><br/><br/>

    <label>
    Arriving in:

    {/* <input type="text" value={tocity} onChange={e => setTocity(e.target.value)} /> */}

    <select value={tocity} onChange={selectedOption => setTocity(selectedOption.target.value)} >
      <option value="London">London</option>
      <option value="New York">New York</option>
      <option value="Delhi">Delhi</option>
      <option value="Canberra">Canberra</option>
      <option value="Tokyo">Tokyo</option>
    </select>
    
    </label><br/><br/>

    <button type="button" onClick={handleGetPrice}>Get Price</button>
    </form>
    {passengerPrice && (
    <div>
    <h2>The price based on your route and aircraft is: {passengerPrice}</h2>
    <h2>Please fill the passenger details below to confirm your booking</h2>
    <form>

    <label>
    Name:
    <input type="text" value={name} onChange={e => setName(e.target.value)} />
    </label>
    <br/>
    <br/>

    <label>
    Email:
    <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
    </label>
    <br/>
    <br/>
    <input type="hidden" value={passengerPrice} onChange={e => setPassengerPrice(e.target.value)} />
    <button type="button" onClick={handleAddPassenger}>Confirm Booking </button>
    </form>
    {bookingSuccessful && (
    <div>
    <h2>Congratulations!! Your booking was successful.</h2>
    <h2> Please refresh the page to rent a new flight.</h2>
    </div>
    )}
    </div>
    )}
    </div>
    );
    };
    
    export default App;
