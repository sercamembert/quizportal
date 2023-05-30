/* eslint-disable jsx-a11y/alt-text */
import waveImg from "../../img/home-blocks/wave.png";
import waveUpImg from "../../img/vectors/wave.svg";
import logoImg from "../../img/logo.png";
import googleImg from "../../img/icons/google.png";
import { Link, useLocation } from "react-router-dom";
import { auth, signInWithGoogle } from "../../config/firebase";
import { useEffect, useState } from "react";
import {
  User,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FirebaseError } from "firebase/app";
import LoadingSpinner from "../../components/Spinner";
import { fail } from "assert";

interface CreateUser {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirm password is required"),
});

export const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUser>({
    resolver: yupResolver(validationSchema),
  });
  const [registerError, setRegisterError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const handleSignUp = async (data: CreateUser) => {
    try {
      setIsLoading(true);
      await validationSchema.validate(data, { abortEarly: false });
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(user, { displayName: data.username });
      const userToSave: User | null = user;
      localStorage.setItem("user", JSON.stringify(userToSave));
      const { from } = location.state || {
        from: { pathname: "/" },
      };
      window.location.reload();
      window.location.replace(from.pathname);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorMessage = error.message;
        if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
          setRegisterError("Account with this e-mail already exists.");
        } else {
          setRegisterError(errorMessage);
        }
      } else {
        setRegisterError("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const { from } = location.state || {
        from: { pathname: "/" },
      };
      window.location.replace(from.pathname);
    } else {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          const userToSave: User | null = user;
          localStorage.setItem("user", JSON.stringify(userToSave));
          const { from } = location.state || {
            from: { pathname: "/" },
          };
          window.location.replace(from.pathname);
        }
      });
      return unsubscribe;
    }
  }, [location.state]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="signup__wrapper">
          <img src={waveImg} alt="waveImg" className="signup-wave" />
          <object
            data={waveUpImg}
            type="image/svg+xml"
            className="signup-waveUp"
          ></object>
          <form onSubmit={handleSubmit(handleSignUp)} className="signup__form">
            <img src={logoImg} alt="quizportal.pl" />
            <div
              className="signup__google"
              onClick={signInWithGoogle}
              tabIndex={0}
            >
              <img src={googleImg} alt="sign up with google" />
              <span>Sign Up with Google</span>
            </div>
            <hr className="signup__line" />
            <div className="signup-input">
              <span className="signup-input__title">Username</span>
              <input
                type="text"
                placeholder="Username"
                {...register("username")}
              />
              {errors.username && (
                <span className="signup-input__error">
                  {errors.username.message}
                </span>
              )}
            </div>
            <div className="signup-input">
              <span className="signup-input__title">Email</span>
              <input type="text" placeholder="Email" {...register("email")} />
              {errors.email && (
                <span className="signup-input__error">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="signup-input">
              <span className="signup-input__title">Password</span>
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <span className="signup-input__error">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="signup-input">
              <span className="signup-input__title">Confirm password</span>
              <input
                type="password"
                placeholder="Confirm password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <span className="signup-input__error">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            {registerError && (
              <p className="signup-input__error">{registerError}</p>
            )}
            <button type="submit" className="signup-btn">
              Sign Up
            </button>
            <p>
              Already have an account?{" "}
              <Link to="/login" className="signup__message">
                Log in here
              </Link>
            </p>
          </form>
        </div>
      )}
    </>
  );
};
