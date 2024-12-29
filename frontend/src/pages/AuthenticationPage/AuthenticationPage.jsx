import React from "react";
import Login from "../../components/Login";
import Header2 from "../../components/Header2";
import Footer from "../../components/Footer";

function AuthenticationPage() {
  return (
    <>
      <Header2 />
      {/* <Signup/> */}
      <Login />

      <Footer />
    </>
  );
}

export default AuthenticationPage;
