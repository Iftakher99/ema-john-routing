import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import "./Shipment.css";
const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
      <input
        defaultValue={loggedInUser.name}
        name='name'
        placeholder=' Your Name'
        ref={register({ required: true })}
      />
      {errors.name && <span className='error'>Name is required</span>}

      <input
        name='email'
        defaultValue={loggedInUser.email}
        placeholder=' Your Email'
        ref={register({ required: true })}
      />
      {errors.name && <span className='error'>Email is required</span>}

      <input
        name='Address'
        placeholder=' Your Address'
        ref={register({ required: true })}
      />

      {errors.name && <span className='error'>Address is required</span>}
      <input
        name='phone num'
        placeholder=' Your Phone number'
        ref={register({ required: true })}
      />

      {errors.name && <span className='error'>phone number is required</span>}

      <input type='submit' />
    </form>
  );
};

export default Shipment;
