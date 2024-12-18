import * as yup from 'yup';

export const registerPageSchema = yup.object().shape({
    userName: yup.string().required("kullanıcı adını doldurunuz"),
    Password: yup.string().required("Şifeyi Doldurunuz")
})