/* eslint-disable jsx-a11y/alt-text */
import waveImg from "../../img/home-blocks/wave.png";
import waveUpImg from "../../img/vectors/wave.svg";
import logoImg from "../../img/logo.png";
import { Link, useLocation } from "react-router-dom";
import googleImg from "../../img/icons/google.png";
import { auth, signInWithGoogle } from "../../config/firebase";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import LoadingSpinner from "../../components/Spinner";

interface UserI {
  email: string;
  password: string;
  username: string;
}

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const LoginPage = () => {
  const [errorMessage, setLoginError] = useState<String>("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserI>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoading(true);
        window.location.replace("/");
      } else {
        setIsLoading(false);
      }
    });
    return unsubscribe;
  }, [location.state]);

  const handleFormSubmit = async (data: UserI) => {
    try {
      setIsLoading(true);
      await validationSchema.validate(data, { abortEarly: false });
      setEmail(data.email);
      const { user } = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(user, { displayName: data.username });
      const { from } = location.state || {
        from: { pathname: "/" },
      };
      window.location.replace(from.pathname);
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorMessage = error.message;
        if (errorMessage === "Firebase: Error (auth/wrong-password).") {
          setLoginError("Wrong email or password");
        } else {
          setLoginError(errorMessage);
        }
      } else {
        setLoginError("An unknown error occurred");
      }
    }
  };
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
          <form
            action="post"
            className="signup__form"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <img src={logoImg} alt="quizportal.pl" />
            <div
              className="signup__google"
              onClick={() => {
                signInWithGoogle();
                setIsLoading(true);
              }}
              tabIndex={0}
            >
              <img src={googleImg} alt="sign up with google" />
              <span>Sign In with Google</span>
            </div>
            <hr className="signup__line" />
            <div className="signup-input">
              <span className="signup-input__title">Email</span>
              <input type="text" placeholder="Email" {...register("email")} />
              <span className="signup-input__error">
                {errors.email?.message}
              </span>
            </div>
            <div className="signup-input">
              <div className="signup-input__title">
                <span>Password</span>
                <span className="signup-input__reset" tabIndex={0}>
                  <Link to="/forgot-password" className="signup__message">
                    Forgot password?
                  </Link>
                </span>
              </div>
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              <span className="signup-input__error">
                {errors.password?.message}
              </span>
            </div>
            {errorMessage && (
              <p className="signup-input__error">{errorMessage}</p>
            )}
            <button className="signup-btn">Sign In</button>
            <p>
              Don't have account?{" "}
              <Link to="/signup" className="signup__message">
                Create
              </Link>
            </p>
          </form>
        </div>
      )}
    </>
  );
};
