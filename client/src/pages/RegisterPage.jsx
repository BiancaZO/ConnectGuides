import { useState } from "react";
import {Link} from "react-router-dom";
import { Navigate } from "react-router-dom"
import axios from 'axios';

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [redirectToLogin, setRedirectToLogin] = useState(false);

 
 // VALIDATE
 function validateForm() {
  if (!name.trim() && !email.trim() && !password.trim() && !phone.trim() && !address.trim()) {
    alert("All fields cannot be empty.");
    return false;
  }
 //name validation
  if (!name.trim()) {
    alert("Name cannot be empty.");
    return false;
  }
  const nameParts = name.trim().split(" ");
  if (nameParts.length < 2) {
    alert("Please enter at least first and last name.");
    return false;
  }
//email validation
  if (!email.trim()) {
    alert("Email cannot be empty.");
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }

  //password validation
  if (!password.trim()) {
    alert("Password cannot be empty.");
    return false;
  }
  if (password.length < 8) {
    alert("Password must be at least 8 characters long.");
    return false;
  }

  //phone validation
  if (!phone.trim()) {
    alert("Phone number cannot be empty.");
    return false;
  }
  const phoneRegex = /^\d+$/; // only numbers
  if (!phoneRegex.test(phone)) {
    alert("Phone number can only contain numbers.");
    return false;
  }
  return true; 
}

  async function registerUser(event) {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }    
    try {
      await axios.post('/register', {
        name,
        email,
        password,
        phone,
        address
      });
      alert('Registration successful. Welcome to Connect Guides!');
      setRedirectToLogin(true);
     
    } catch (e) {
      alert('Sorry, this email is already registered.\nPlease, go to login or register a new email!');
    }
  }
  
  return (
    <div className="mt-4 grow flex items-center justify-around">
        {redirectToLogin && <Navigate to="/login" />} 
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="tel"
            placeholder="000-000-000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="356, Vancouver St"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member?{" "}
            <Link className="underline text-black" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}