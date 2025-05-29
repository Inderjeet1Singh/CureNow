import React from "react";

const Footer = () => {
  return (
    <div class="text-center bg-gray-500">
      <footer class="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            CureNow Ltd.
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
