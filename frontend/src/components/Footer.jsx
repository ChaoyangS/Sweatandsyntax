import React, { useState } from "react";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer class="footer">
      <div>
        {/* <div class="footer__title">
            <h1>Get in Touch</h1>

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
          </div> */}

        <p class="copyright">
          Copyright Sweat and Syntax © 2024 All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
