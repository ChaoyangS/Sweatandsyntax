import React from "react";
import Login from "../../components/Login";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function AuthenticationPage() {
  return (
    <>
      <Header />
      {/* <Signup/> */}
      <Login />

      <Footer />
    </>
  );
}

export default AuthenticationPage;
