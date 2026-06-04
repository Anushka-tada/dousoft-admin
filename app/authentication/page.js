// "use client"
// import React, { useState , useEffect } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { loginServ } from "../services/login.service";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useRouter } from "next/navigation";
// import { isAdminLoggedIn } from "../utils/auth";

// function Login() {

//     const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);

//   useEffect(() => {
//   if (isAdminLoggedIn()) {
//     router.push("/dashboard");
//   }
// }, []);

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: Yup.object({
//       email: Yup.string()
//         .email("Invalid email format")
//         .required("Email is required"),
//       password: Yup.string().required("Password is required"),
//     }),
//    onSubmit: async (values, { setSubmitting }) => {
//   try {
//     const res = await loginServ(values);

//     toast.success(res.data.message);

//     localStorage.setItem("admin_token", res.data.token);
// localStorage.setItem("admin_user", JSON.stringify(res.data.admin));
    

//     router.push("/dashboard")
//   } catch (error) {
//     toast.error(error?.response?.data?.message || "Login failed");
//   } finally {
//     setSubmitting(false);
//   }
// }



//   });
//   return (
//     <div className="signin-container">
//       <div className="signin-card">
//         {/* <img
//           src="assets/images/logo.jpeg"
//           alt="Rupee Loan Logo"
//           className="sign-logo"
//         /> */}
//         <h2>Sign In</h2>
//         <form onSubmit={formik.handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">
//               Email Address
//             </label>
//             <div className="input-group">
//               <span className="input-group-text">
//                 <i className="bi bi-envelope" />
//               </span>
//               <input
//                 type="email"
//                 className="form-control"
//                 id="email"
//                 placeholder="Enter your email"
//                 required=""
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.email}
//               />
             
//             </div>
//              {formik.touched.email && formik.errors.email ? (
//                   <small
//                     className="text-danger mb-2"
//                     style={{ marginTop: "-20px" }}
//                   >
//                     {formik.errors.email}
//                   </small>
//                 ) : null}
//           </div>
//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">
//               Password
//             </label>
//             <div className="input-group">
//               <span className="input-group-text">
//                 {/* <i className="bi bi-lock" /> */}
//                 <i
//                   class={!showPassword ? " bi bi-lock" : " bi bi-unlock"}
//                   style={{ cursor: "pointer" }}
//                onClick={() => setShowPassword(!showPassword)}

//                 ></i>
//               </span>
//               <input
//                 type={!showPassword ? "password" : "text"}
//                 className="form-control"
//                 id="password"
//                 placeholder="Enter your password"
//                 required=""
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.password}
//               />
              
//             </div>
//             {formik.touched.password && formik.errors.password ? (
//                   <small
//                     className="text-danger mb-2"
//                     style={{ marginTop: "-20px" }}
//                   >
//                     {formik.errors.password}
//                   </small>
//                 ) : null}
//           </div>
//           <div className="mb-3 text-end">
//             <a
//               onClick={() => toast.info("Coming Soon")}
//               className="forgot-password cursor"
//             >
//               Forgot Password?
//             </a>
//           </div>

//           <button
//             type="submit"
//             className="btn btn-gradient"
//             disabled={formik.isSubmitting || !formik.isValid}
//           >
//             {formik.isSubmitting ? "Secure Login ..." : "Login"}
//           </button>
//         </form>
//         {/* <div className="mt-4 text-center">
//       Don't have an account? <a href="sign-up.html">Sign Up</a>
//     </div> */}
//       </div>
//     </div>
//   );

"use client";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginServ } from "../services/login.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { isAdminLoggedIn } from "../utils/auth";
import {
  IconMail,
  IconLock,
  IconLockOpen,
  IconLogin2,
  IconLoader2,
  IconShieldCheck,
} from "@tabler/icons-react";

/* ── Inline styles (no extra CSS file needed) ── */
const S = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
  },
  /* decorative blobs */
  blob1: {
    position: "absolute",
    width: 340,
    height: 340,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(11,111,30,0.08) 0%, transparent 70%)",
    top: "-80px",
    right: "-80px",
    pointerEvents: "none",
  },
  blob2: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(11,111,30,0.07) 0%, transparent 70%)",
    bottom: "-60px",
    left: "-60px",
    pointerEvents: "none",
  },
  card: {
    background: "#ffffff",
    borderRadius: 20,
    boxShadow: "0 8px 40px rgba(11,111,30,0.12), 0 2px 12px rgba(0,0,0,0.06)",
    width: "100%",
    maxWidth: 420,
    overflow: "hidden",
    position: "relative",
    zIndex: 1,
  },
  cardTop: {
    background: "linear-gradient(135deg, #0b6f1e 0%, #16a34a 100%)",
    padding: "32px 36px 28px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
  },
  logoWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    background: "rgba(255,255,255,0.18)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(255,255,255,0.25)",
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: "#ffffff",
    margin: 0,
    letterSpacing: "-0.01em",
  },
  cardSub: {
    fontSize: 13,
    color: "rgba(255,255,255,0.75)",
    margin: 0,
    fontWeight: 400,
  },
  cardBody: {
    padding: "28px 32px 32px",
  },
  label: {
    display: "block",
    fontSize: 12.5,
    fontWeight: 600,
    color: "#374151",
    marginBottom: 6,
    letterSpacing: "0.02em",
  },
  inputWrap: {
    position: "relative",
    marginBottom: 4,
  },
  inputIcon: {
    position: "absolute",
    left: 12,
    top: "50%",
    transform: "translateY(-50%)",
    color: "#9ca3af",
    display: "flex",
    alignItems: "center",
    pointerEvents: "none",
  },
  inputIconRight: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: "translateY(-50%)",
    color: "#9ca3af",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    padding: 2,
    borderRadius: 6,
    background: "transparent",
    border: "none",
    transition: "color 0.15s",
  },
  input: {
    width: "100%",
    height: 42,
    paddingLeft: 38,
    paddingRight: 40,
    border: "1px solid #e2f0e8",
    borderRadius: 9,
    fontSize: 13.5,
    color: "#111827",
    background: "#f9fafb",
    outline: "none",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    transition: "border-color 0.15s, box-shadow 0.15s",
    boxSizing: "border-box",
  },
  inputError: {
    borderColor: "#fca5a5",
    background: "#fff5f5",
  },
  errorText: {
    fontSize: 11.5,
    color: "#dc2626",
    marginTop: 5,
    marginBottom: 0,
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  forgotRow: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: 20,
    marginTop: 16,
  },
  forgotLink: {
    fontSize: 12.5,
    color: "#0b6f1e",
    fontWeight: 600,
    cursor: "pointer",
    textDecoration: "none",
    background: "none",
    border: "none",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    padding: 0,
    transition: "opacity 0.15s",
  },
  submitBtn: {
    width: "100%",
    height: 44,
    background: "linear-gradient(135deg, #0b6f1e 0%, #16a34a 100%)",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    transition: "opacity 0.15s, transform 0.15s",
    letterSpacing: "0.01em",
  },
  submitBtnDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  securityNote: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#f0fdf4",
    border: "1px solid #bbf7d0",
    borderRadius: 9,
    padding: "10px 14px",
    marginTop: 18,
  },
  securityText: {
    fontSize: 11.5,
    color: "#374151",
    margin: 0,
    lineHeight: 1.4,
  },
  divider: {
    height: 1,
    background: "#f0fdf4",
    margin: "0 32px",
  },
  fieldGroup: {
    marginBottom: 16,
  },
};

/* tiny spinner */
const Spinner = () => (
  <span
    style={{
      width: 16,
      height: 16,
      border: "2px solid rgba(255,255,255,0.35)",
      borderTopColor: "#fff",
      borderRadius: "50%",
      display: "inline-block",
      animation: "lspin 0.7s linear infinite",
    }}
  />
);

function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocus, setEmailFocus]     = useState(false);
  const [passFocus, setPassFocus]       = useState(false);

  useEffect(() => {
    if (isAdminLoggedIn()) router.push("/dashboard");
  }, []);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await loginServ(values);
        toast.success(res.data.message);
        localStorage.setItem("admin_token", res.data.token);
        localStorage.setItem("admin_user", JSON.stringify(res.data.admin));
        router.push("/dashboard");
      } catch (error) {
        toast.error(error?.response?.data?.message || "Login failed");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const focusStyle = {
    borderColor: "#0b6f1e",
    boxShadow: "0 0 0 3px rgba(11,111,30,0.09)",
    background: "#fff",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        @keyframes lspin { to { transform: rotate(360deg); } }
        .login-input:focus { border-color: #0b6f1e !important; box-shadow: 0 0 0 3px rgba(11,111,30,0.09) !important; background: #fff !important; }
        .login-submit:hover:not(:disabled) { opacity: 0.92; transform: translateY(-1px); }
        .login-submit:active:not(:disabled) { transform: translateY(0); }
        .eye-btn:hover { color: #0b6f1e !important; }
        .forgot-btn:hover { opacity: 0.75; }
      `}</style>

      <div style={S.wrapper}>
        {/* decorative blobs */}
        <div style={S.blob1} />
        <div style={S.blob2} />

        <div style={S.card}>

          {/* ── Card top ── */}
          <div style={S.cardTop}>
            <div style={S.logoWrap}>
              <IconShieldCheck size={28} stroke={1.8} color="#fff" />
            </div>
            <div style={{ textAlign: "center" }}>
              <h2 style={S.cardTitle}>Welcome Back</h2>
              <p style={S.cardSub}>Sign in to your admin panel</p>
            </div>
          </div>

          {/* ── Card body ── */}
          <div style={S.cardBody}>
            <form onSubmit={formik.handleSubmit} noValidate>

              {/* Email */}
              <div style={S.fieldGroup}>
                <label htmlFor="email" style={S.label}>Email Address</label>
                <div style={S.inputWrap}>
                  <span style={S.inputIcon}>
                    <IconMail size={15} stroke={1.8} />
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="login-input"
                    placeholder="Enter your email"
                    autoComplete="email"
                    style={{
                      ...S.input,
                      ...(formik.touched.email && formik.errors.email
                        ? S.inputError
                        : {}),
                    }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <p style={S.errorText}>{formik.errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div style={S.fieldGroup}>
                <label htmlFor="password" style={S.label}>Password</label>
                <div style={S.inputWrap}>
                  <span style={S.inputIcon}>
                    <IconLock size={15} stroke={1.8} />
                  </span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="login-input"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    style={{
                      ...S.input,
                      ...(formik.touched.password && formik.errors.password
                        ? S.inputError
                        : {}),
                    }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <button
                    type="button"
                    className="eye-btn"
                    style={{ ...S.inputIconRight, color: showPassword ? "#0b6f1e" : "#9ca3af" }}
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword
                      ? <IconLockOpen size={15} stroke={1.8} />
                      : <IconLock size={15} stroke={1.8} />
                    }
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p style={S.errorText}>{formik.errors.password}</p>
                )}
              </div>

              {/* Forgot password */}
              {/* <div style={S.forgotRow}>
                <button
                  type="button"
                  className="forgot-btn"
                  style={S.forgotLink}
                  onClick={() => toast.info("Coming Soon")}
                >
                  Forgot Password?
                </button>
              </div> */}

              {/* Submit */}
              <button
                type="submit"
                className="login-submit"
                style={{
                  ...S.submitBtn,
                  ...(formik.isSubmitting || !formik.isValid
                    ? S.submitBtnDisabled
                    : {}),
                }}
                disabled={formik.isSubmitting || !formik.isValid}
              >
                {formik.isSubmitting ? (
                  <>
                    <Spinner />
                    Signing in…
                  </>
                ) : (
                  <>
                    <IconLogin2 size={16} stroke={2} />
                    Sign In
                  </>
                )}
              </button>

              {/* Security note */}
              <div style={S.securityNote}>
                <IconShieldCheck size={16} stroke={1.8} color="#0b6f1e" style={{ flexShrink: 0 }} />
                <p style={S.securityText}>
                  Your session is secured with end-to-end encryption.
                </p>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

  // return (
  //   <section className="login-wrapper loginPage">
  //     <div className="background-section">
  //       <img
  //         src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
  //         alt="Financial Background"
  //       />
  //       <div className="background-overlay"></div>
  //     </div>

  //     <div className="floating-element"></div>
  //     <div className="floating-element"></div>
  //     <div className="floating-element"></div>

  //     <div className="login-container">
  //       <div className="login-card">
  //         <div className="login-header">
  //           <div className="brand-logo">
  //             <i className="fas fa-hand-holding-usd"></i>
  //           </div>
  //           <h1 className="login-title">NBFC Admin</h1>
  //           <p className="login-subtitle">Secure Access Portal</p>
  //         </div>

  //         <div className="login-body">
  //           <form onSubmit={formik.handleSubmit}>
  //             <div className="mb-3">
  //               <label for="email" className="form-label">
  //                 <i className="fas fa-envelope me-2"></i>Email Address
  //               </label>
  //               <div className="input-group">
  //                 <span className="input-group-text">
  //                   <i class="fas fa-envelope"></i>
  //                 </span>
  //                 <input
  //                   type="email"
  //                   class="form-control"
  //                   id="email"
  //                   onChange={formik.handleChange}
  //                   onBlur={formik.handleBlur}
  //                   value={formik.values.email}
  //                   placeHolder="admin@nbfc.com"
  //                 />
  //               </div>
  //               {formik.touched.email && formik.errors.email ? (
  //                 <small
  //                   className="text-danger mb-2"
  //                   style={{ marginTop: "-20px" }}
  //                 >
  //                   {formik.errors.email}
  //                 </small>
  //               ) : null}
  //             </div>

  //             <div className="mb-4">
  //               <label for="password" className="form-label">
  //                 <i className="fas fa-key me-2"></i>Password
  //               </label>
  //               <div className="input-group">
  //                 <span className="input-group-text">
  //                   <i
  //                     class={showPassword ? " fas fa-lock" : " fas fa-unlock"}
  //                     style={{ cursor: "pointer" }}
  //                     onClick={() => setShowPassword(!showPassword)}
  //                   ></i>
  //                 </span>
  //                 <input
  //                   type={showPassword ? "password" : "text"}
  //                   class="form-control"
  //                   id="password"
  //                   placeHolder="••••••••"
  //                   onChange={formik.handleChange}
  //                   onBlur={formik.handleBlur}
  //                   value={formik.values.password}
  //                 />
  //               </div>
  //               {formik.touched.password && formik.errors.password ? (
  //                 <small
  //                   className="text-danger mb-2"
  //                   style={{ marginTop: "-20px" }}
  //                 >
  //                   {formik.errors.password}
  //                 </small>
  //               ) : null}
  //               <div className="text-end mt-2">
  //                 <a
  //                   className="forgot-link"
  //                   style={{ cursor: "pointer" }}
  //                   onClick={() => toast.info("Coming Soon")}
  //                 >
  //                   Forgot password? <i className="fas fa-arrow-right ms-1"></i>
  //                 </a>
  //               </div>
  //             </div>

  //             <button
  //               type="submit"
  //               className="btn btn-login"
  //               disabled={formik.isSubmitting || !formik.isValid}
  //             >
  //               <i className="fas fa-sign-in-alt me-2"></i>{" "}
  //               {formik.isSubmitting ? "Secure Login ..." : "Secure Login"}
  //             </button>

  //             <div className="security-notice">
  //               <i className="fas fa-shield-alt"></i>
  //               <p>Your login is protected with advanced encryption</p>
  //             </div>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   </section>
  // );
//}

//export default Login;
