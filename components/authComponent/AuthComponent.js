import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { LockClosedIcon } from '@heroicons/react/20/solid'
import {useRouter} from "next/router";
import {userLogin} from "../../public/src/features/UserSlice";
import {registerUser} from "../../public/src/features/UserSlice";




const AuthComponent = () => {
    const { userInfo, accessToken } = useSelector((state) => state.users)
    const router = useRouter();
    useEffect(() => {
        if(userInfo) router.push("/").then(()=>window.location.reload())
    }, [router, userInfo]);


    const dispatch = useDispatch()

    const initialState = {
        id:null,
        username:"",
        email:"",
        password:"",
        passwordConfirm:"",
        isRemember:false
    }

    const [userState, setUserState] = useState(initialState);

    const handleInputChange = event => {
        const { id, value } = event.target;
        setUserState({ ...userState, [id]: value });
    };

    const login = async (event)=>{
        event.preventDefault()
        let username = userState.username;
        let password = userState.password;
        dispatch(userLogin({username,password}))
            .unwrap()
            .then((response)=>{
                router.push("/")
            })
            .catch((error)=>{
                console.log(error)
            })

    }

    const register = async (event)=>{
        event.preventDefault()
        let username = userState.username;
        let password = userState.password;
        let passwordConfirmation = userState.passwordConfirm;
        let email = userState.email;

        if (password !== passwordConfirmation){
            console.log("password mismatch")
        }else{
            dispatch(registerUser({username,email,password}))
                .unwrap()
                .then((response)=>{
                    console.log(response)
                    router.push("/")
                })
                .catch((error)=>{
                    console.log(error)
                })
        }

    }


    return (
        <div>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        />
                        {router.query.option?
                            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
                                {router.query.option==='login' ? "Sign in":"Sign up"}  to your account
                            </h2>
                        :
                            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white animate-pulse bg-neutral-800 w-full h-10">

                            </h2>
                        }

                    </div>
                    <form className="mt-8 space-y-6" onSubmit={router.query.option?router.query.option==="login"?login:register:null} method="POST">
                        <input type="hidden" name="remember" defaultValue="true" />
                        {router.query.option?

                            <div className="-space-y-px rounded-md shadow-sm">
                                {router.query.option==="register"? <div className={"pb-2"}>
                                    <label htmlFor="email" className="sr-only">
                                        Email
                                    </label>
                                    <input value={userState.email||""}
                                           onChange={handleInputChange}
                                           id="email"
                                           name="email"
                                           type="email"
                                           autoComplete="email"
                                           required
                                           className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                           placeholder="Email"
                                    />
                                </div>:null}

                                <div className={"pb-2"}>
                                    <label htmlFor="username" className="sr-only">
                                        Username
                                    </label>
                                    <input value={userState.username||""}
                                           onChange={handleInputChange}
                                           id="username"
                                           name="username"
                                           type="text"
                                           autoComplete="text"
                                           required
                                           className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                           placeholder="Username"
                                    />
                                </div>
                                <div className={"pb-2"}>
                                    <label htmlFor="password" className="sr-only">
                                        Password
                                    </label>
                                    <input value={userState.password||""}
                                           onChange={handleInputChange}
                                           id="password"
                                           name="password"
                                           type="password"
                                           autoComplete="current-password"
                                           required
                                           className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                           placeholder="Password"
                                    />
                                </div>
                                {router.query.option==="register"?     <div>
                                    <label htmlFor="passwordConfirm" className="sr-only">
                                        Password Confirmation
                                    </label>
                                    <input value={userState.passwordConfirm||""}
                                           onChange={handleInputChange}
                                           id="passwordConfirm"
                                           name="passwordConfirm"
                                           type="password"
                                           autoComplete="password-confirm"
                                           required
                                           className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                           placeholder="Confirm password"
                                    />
                                </div>:null}

                            </div>:<div className="-space-y-px rounded-md shadow-sm">
                                <div className={"pb-2"}>
                                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white animate-pulse bg-neutral-800 w-full h-10">

                                    </h2>
                                </div>
                                <div className={"pb-2"}>
                                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white animate-pulse bg-neutral-800 w-full h-10">

                                    </h2>
                                </div>
                                <div className={"pb-2"}>
                                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white animate-pulse bg-neutral-800 w-full h-10">

                                    </h2>
                                </div>
                                <div>
                                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white animate-pulse bg-neutral-800 w-full h-10">

                                    </h2>
                                </div>
                            </div>
                        }


                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            {router.query.option?
                                router.query.option==="login"?
                                <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                </span>
                                Sign in
                            </button>: <button
                                        type="submit"
                                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                </span>
                                        Register
                                    </button>

                                :<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white animate-pulse bg-neutral-800 w-full h-10">

                                </h2>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthComponent;
