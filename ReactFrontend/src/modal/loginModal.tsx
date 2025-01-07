import React, { useState, useEffect } from 'react';
import { TextField, Button, InputAdornment } from '@mui/material';
import { FaLock } from 'react-icons/fa';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { registerPageSchema } from '../schemas/RegisterPageSchema'


function RegisterModal({ closeModal }: { closeModal: () => void }) {
    const submit = (values: any) => {
        console.log("Register values:", values);
        toast.success("Kullanıcı Girişi Başarılı!");
        closeModal();
    };

    const {
        values,
        handleSubmit,
        handleChange,
        errors,
        resetForm
    } = useFormik({
        initialValues: {
            userName: '',
            Password: '',
        },
        onSubmit: submit,
        validationSchema: registerPageSchema
    });

    const clear = () => {
        resetForm();
        toast.info("Form temizlendi");
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Giriş Yap</h2>
            <form onSubmit={handleSubmit}>
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

                <div style={{ marginTop: '20px' }}>
                    <Button
                        type='submit'
                        variant="contained"
                        style={{ marginRight: '10px' }}
                    >
                        Giriş Yap
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={clear}
                        style={{ marginRight: '10px' }}
                    >
                        Temizle
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={closeModal}
                    >
                        İptal
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default RegisterModal;
