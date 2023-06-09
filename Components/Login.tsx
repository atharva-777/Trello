"use client";

import { FormEvent, useState } from "react";
import { account, login } from "../appwrite";
import Homee from "@/Components/Homee";



export default function LogIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [login1,setLogin1] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    login(email,password)
    .then((account)=>{
        setLogin1(true)
        alert(`You are logged in as ${account.$id} `)
    })
    .catch(()=>alert('wrong credentials'))

    
  };

  return (
    <div>

        {login1===true?<Homee/>:<h1>Please login</h1>}

    <form className="form flex justify-center gap-5 m-10" onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        />

      <button type="submit">Log In</button>
    </form>

        </div>
  );
}

