'use client';
import { useEffect, useState, useRef } from "react";
import { useMutation } from "@apollo/client";
import { SIGNUP_MUTATION } from "../mutations"

export function SIGNUPFORM(){
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        bio: '',
        terms: false
    });

    const [errorMessage, setErrorMessage] = useState('');

    const [passwordMissmatchError, setPasswordMissmatchError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    useEffect(() => {
        if(formData.confirmPassword && formData.password !== formData.confirmPassword){
            setPasswordMissmatchError('Passwords do not match');
        } else {
            setPasswordMissmatchError('');
        }
    }, [formData.password, formData.confirmPassword]);

    const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        if(passwordMissmatchError){
            setErrorMessage('Please fix password mismatch errors before submitting the form');
            return;
        }

        try{
            const signup_data = await signup({
                variables: {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    bio: formData.bio
                }
            });

            if(signup_data){
                console.log(signup_data)
                // Signup successful, redirect to login page
                window.location.href = '/todoapp/signin';
            } else if(error){
                setErrorMessage('Signup failed: ' + error.message);
            }
        } catch (error) {
            setErrorMessage('An error occurred while signing up');
            console.error('Mutation error:', error);

            if (error.message.includes("UNIQUE")){
                if(error.message.includes("email")){
                    setErrorMessage("email already exists")
                }else if(error.message.includes("username")){
                    setErrorMessage("username already exists")
                }
            }
        }
    };

    return(
        <div>
            <h1 className="p-2 m-2 font-bold">Please complete the form below to create an account</h1>
            <div>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </div>
            <form onChange={handleChange} onSubmit={handleSubmit}>
                <div>
                    <input type="text" id="username" name="username" required placeholder="Username"
                        className="border-black-amber-400 rounded border-2 m-2 p-2"
                    />
                </div>

                <div>
                    <input type="email" id="email" name="email" required placeholder="Email"
                        className="border-black-amber-400 rounded border-2 m-2 p-2"
                    />
                </div>

                <div>
                    <input type="password" id="password" name="password" required placeholder="Password"
                        className="border-black-amber-400 rounded border-2 m-2 p-2"
                    />
                </div>

                <div>
                    <input type="password" id="confirmPassword" name="confirmPassword" required placeholder="Confirm Password"
                        className="border-black-amber-400 rounded border-2  m-2 p-2"
                    />
                </div>

                <div>
                    <input type="text" id="firstName" name="firstName" placeholder="First Name (optional)"
                        className="border-black-amber-400 rounded border-2 m-2 p-2"
                    />
                </div>

                <div>
                    <input type="text" id="lastName" name="lastName" placeholder="Last Name (optional)"
                        className="border-black-amber-400 rounded border-2 m-2 p-2"
                    />
                </div>

                <div>
                    <input type="text" id="bio" name="bio" placeholder="About me (optional)"
                        className="border-black-400 rounded border-2 m-2 p-2"
                    />
                </div>

                <div>
                    {passwordMissmatchError && <p className="text-red-500">{passwordMissmatchError}</p>}
                </div>

                <div>
                    <label htmlFor="terms" className="p-2 m-2">I agree to the terms and conditions</label>
                    <input type="checkbox" id="terms" name="terms" required className="border-black-400"/>
                </div>

                <button type="submit" className="hover:underline text-black-400 bg-amber-400 border-amber-500 rounded px-4 py-2 m-2">Sign Up</button>
            </form>

            <div>
                <p className="font-bold">Already have an account? Please sign in <a href="/todoapp/login" className="text-amber-400 hover:underline">here!</a></p>
            </div>

        </div>
    );
}