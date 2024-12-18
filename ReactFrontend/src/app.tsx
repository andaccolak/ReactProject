import { useState } from 'react'
import React from 'react';
import './App.css'
import RouterConfig from './config/RouterConfig'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';


function app() {
  return (
    <div>
      <RouterConfig />
      <ToastContainer autoClose={2500} />
    </div>
  )
}

export default app