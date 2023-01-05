import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/Login.module.css';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi';
import { use, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useFormik } from 'formik';
import validate from '../lib/validate';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function login() {
  const [show, setShow] = useState(false);
  const router = useRouter();

  // formik hook
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: validate,
    onSubmit,
  });

  async function onSubmit(values) {
    const status = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: '/',
    });

    if (status.ok) router.push(status.url);
  }

  async function handleGoogleSignin() {
    signIn('google', { callbackUrl: '/' });
  }

  async function handleGitHubSignin() {
    signIn('github', { callbackUrl: '/' });
  }

  return (
    <>
      <Head>
        <title>User Auth | Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/morty.png" />
      </Head>
      <Layout>
        <section className="w-full sm:w-3/4 p-2 mx-auto flex flex-col gap-10">
          <div className={styles.title}>
            <h1 className="text-gray-800 text-4xl font-bold py-4">Explore</h1>
            <p className="w-3/4 mx-auto text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
            </p>
          </div>

          {/* form */}
          <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
            <div
              className={`${styles.input_group} ${
                formik.errors.email && formik.touched.email ? 'border-red-600' : ''
              }`}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={styles.input_text}
                /* onChange={formik.handleChange}
              value={formik.values.email} */
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
                type={`${show ? 'text' : 'password'}`}
                name="password"
                placeholder="Password"
                className={styles.input_text}
                /* onChange={formik.handleChange}
              value={formik.values.password} */
                {...formik.getFieldProps('password')}
              />
              <span className="flex items-center px-4" onClick={() => setShow(!show)}>
                <HiFingerPrint size={25} />
              </span>
            </div>

            {/* login btns */}
            <div className={styles.input_button}>
              <button type="submit" className={styles.button}>
                Login
              </button>
            </div>
            <div className={styles.input_button}>
              <button type="button" className={styles.button_custom} onClick={handleGoogleSignin}>
                Sign In with Google
                <FcGoogle className="text-2xl" />
              </button>
            </div>
            <div className={styles.input_button}>
              <button type="button" className={styles.button_custom} onClick={handleGitHubSignin}>
                Sign In with GitHub
                <AiFillGithub className="text-2xl" />
              </button>
            </div>
          </form>

          {/* bottom */}
          <p className="text-center text-gray-400">
            Don't have an account yet?{' '}
            <Link href={'/register'} className="text-blue-700">
              Sign Up
            </Link>
          </p>
        </section>
      </Layout>
    </>
  );
}
