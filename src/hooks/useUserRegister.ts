import { useNotify } from '../hooks/useNotify';
import { useFormik, FormikErrors } from 'formik';
import * as Yup from 'yup';
import { api } from '../services/apiClient';
import { FormEvent } from 'react';

export function useUserRegister() {
  const { successNotify, errorNotify } = useNotify();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Campo obrigatório'),
    email: Yup.string().email('Email inválido').required('Campo obrigatório'),
    password: Yup.string().required('Campo obrigatório').min(8, 'Requer no mínimo 8 caractéres'),
    confirmPassword: Yup.string().required('Campo obrigatório').equals([Yup.ref('password'), null], 'As senhas diferem'),
    is_developer: Yup.boolean().required('Campo obrigatório')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      is_developer: false
    },
    validationSchema,
    onSubmit: async (data) => {
      try {
        await api.post('/users/register', data);

        successNotify({
          message: 'Usuário registreado com sucesso',
          path: '/'
        });
      } catch(err: any) {
        errorNotify({ 
          message: err.response.data.message
        });
      }
    }
  });

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    await formik.submitForm()
  }

  return {
    values: formik.values,
    errors: formik.errors,
    handleChange: formik.handleChange,
    handleBlur: formik.handleBlur,
    handleSubmit
  }
}