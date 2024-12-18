import { InputAdornment, TextField } from '@mui/material'
import React from 'react'
import { FaLock } from 'react-icons/fa'
import { IoPersonCircleSharp } from 'react-icons/io5'
import '../css/LoginPage.css'
import { useFormik } from 'formik';
import { registerPageSchema } from '../schemas/RegisterPageSchema'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


function LoginPage() {
    const navigate = useNavigate();
    const submit = (values: any, actions: any) => {
        console.log(values)
        toast.success("Giriş Yapıldı");
        navigate("/");
    }

    const { values, handleSubmit, handleChange, errors, resetForm } = useFormik({
        initialValues: {
            userName: '',
            Password: '',
        },
        onSubmit: submit,
        validationSchema: registerPageSchema
    });
    const clear = () => {
        resetForm();
    }


    return (
        <div className='login'>
            <div className='main'>
                <form onSubmit={handleSubmit}>
                    <div className='form-div'>
                        <TextField
                            sx={{ width: '300px', marginBottom: '25px' }}
                            id="username"
                            name='userName'
                            placeholder='Kullanıcı adı'
                            value={values.userName}
                            onChange={handleChange}

                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IoPersonCircleSharp />
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                            helperText={errors.userName && <span style={{ color: 'red' }}>{errors.userName}</span>}
                        />

                        <TextField
                            sx={{ width: '300px', marginBottom: '25px' }}
                            id="password"
                            name='Password'
                            type='password'
                            placeholder='Şifre'
                            value={values.Password}
                            onChange={handleChange}

                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FaLock />
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                            helperText={errors.Password && <span style={{ color: 'red' }}>{errors.Password}</span>}
                        />
                        <div>
                            <button type='submit' style={{ marginRight: '25px' }}>Giriş Yap</button>
                            <button onClick={clear}>Temizle</button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage