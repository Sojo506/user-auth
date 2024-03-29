import Layout from '../components/Layout';
import Link from 'next/link';
import styles from '../styles/Login.module.css';
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from 'react-icons/hi';
import { useState } from 'react';
import { useFormik } from 'formik';
import { registerValidate } from '../lib/validate';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Register() {
  const [show, setShow] = useState({
    password: false,
    cpassword: false,
  });

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      cpassword: '',
    },
    validate: registerValidate,
    onSubmit,
  });

  async function onSubmit(values) {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    };

    await fetch('https://user-auth-ivory.vercel.app/api/auth/signup', options)
      .then((res) => res.json())
      .then((data) => {
        if (data) router.push('https://user-auth-ivory.vercel.app/login');
      });
  }

  return (
    <>
      <Head>
        <title>User Auth | Register</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/morty.png" />
      </Head>
      <Layout>
        <section className="w-full sm:w-3/4 mx-auto flex flex-col gap-5 sm:gap-10">
          <div className={styles.title}>
            <h1 className="text-gray-800 text-4xl font-bold py-4">Register</h1>
            <p className="w-3/4 mx-auto text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
            </p>
          </div>

          {/* form */}
          <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
            <div
              className={`${styles.input_group} ${
                formik.errors.username && formik.touched.username ? 'border-red-600' : ''
              }`}>
              <input
                type="text"
                name="Username"
                placeholder="Username"
                className={styles.input_text}
                {...formik.getFieldProps('username')}
              />
              <span className="flex items-center px-4">
                <HiOutlineUser size={25} />
              </span>
            </div>
            <div
              className={`${styles.input_group} ${
                formik.errors.email && formik.touched.email ? 'border-red-600' : ''
              }`}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={styles.input_text}
                {...formik.getFieldProps('email')}
              />
              <span className="flex items-center px-4">
                <HiAtSymbol size={25} />
              </span>
            </div>
            <div
              className={`${styles.input_group} ${
                formik.errors.password && formik.touched.password ? 'border-red-600' : ''
              }`}>
              <input
                type={`${show.password ? 'text' : 'password'}`}
                name="password"
                placeholder="Password"
                className={styles.input_text}
                {...formik.getFieldProps('password')}
              />
              <span
                className="flex items-center px-4"
                onClick={() => setShow({ ...show, password: !show.password })}>
                <HiFingerPrint size={25} />
              </span>
            </div>
            <div
              className={`${styles.input_group} ${
                formik.errors.cpassword && formik.touched.cpassword ? 'border-red-600' : ''
              }`}>
              <input
                type={`${show.cpassword ? 'text' : 'password'}`}
                name="cpassword"
                placeholder="Confirm Password"
                className={styles.input_text}
                {...formik.getFieldProps('cpassword')}
              />
              <span
                className="flex items-center px-4"
                onClick={() => setShow({ ...show, cpassword: !show.cpassword })}>
                <HiFingerPrint size={25} />
              </span>
            </div>

            {/* login btn */}
            <div className={styles.input_button}>
              <button type="submit" className={styles.button}>
                Login
              </button>
            </div>
          </form>

          {/* bottom */}
          <p className="text-center text-gray-400">
            Have an account?
            <Link href={'https://user-auth-ivory.vercel.app/login'} className="text-blue-700">
               Sign In
            </Link>
          </p>
        </section>
      </Layout>
    </>
  );
}
