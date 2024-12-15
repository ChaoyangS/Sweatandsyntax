import React, { useState } from "react";

export default function Login() {
  return (
    <>
      <footer class="footer">
        <div>
          <div class="footer__title">
            <h1>Get in Touch</h1>
            <img
              class="footer__icon"
              src=".././assets/Icon-instagram.svg"
              alt="instagram"
            />
            <img
              class="footer__icon"
              src=".././assets/icons/Icon-facebook.svg"
              alt="fb"
            />
            <img
              class="footer__icon"
              src=".././assets/icons/Icon-twitter.svg"
              alt="twitter"
            />
            <h1 class="footer__logo1">Sweat and Syntax</h1>
          </div>

          <div class="footer__address">
            <span>
              <h2>Authors</h2>
              <p>names</p>
              <p>names</p>
              <p>names</p>
              <p>names</p>
              <a href="mailto:shec@seas.upenn.edu" class="email">
                shec@seas.upenn.edu
              </a>
            </span>
          </div>

          <h1 class="footer__logo2">Sweat and Syntax</h1>
          <p class="copyright">
            Copyright Sweat and Syntax © 2024 All Rights Reserved
          </p>
        </div>
      </footer>
    </>
  );
}
