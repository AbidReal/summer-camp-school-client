import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="footer p-10  bg-black text-white">
        <div className=" mx-auto my-auto">
          <Link to="/" className="flex flex-col gap-4 items-center">
            <div className=" font-extrabold text-4xl ">
              Fist<span className="text-red-500  ">Zen</span>
            </div>
          </Link>
          <div className="grid grid-flow-col gap-4 my-4">
            <a href="https://www.linkedin.com/in/abid-hasan-4952a724a/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M22.045 0H1.955C0.876 0 0 0.876 0 1.955v20.089C0 23.124 0.876 24 1.955 24h20.089C23.124 24 24 23.124 24 22.045V1.955C24 0.876 23.124 0 22.045 0zM7.84 20.57H4.324V9.953h3.515v10.617zM5.079 8.904c-1.065 0-1.921-0.856-1.921-1.92 0-1.063 0.856-1.919 1.921-1.919 1.063 0 1.918 0.856 1.918 1.92C6.997 8.048 6.142 8.904 5.079 8.904zM20.57 20.57h-3.516v-5.328c0-1.27-0.025-2.899-1.767-2.899-1.769 0-2.036 1.379-2.036 2.805v5.422h-3.516V9.953h3.35v1.49h0.048c0.466-0.885 1.605-1.823 3.304-1.823 3.537 0 4.184 2.33 4.184 5.362v6.588z" />
              </svg>
            </a>
            <a href="https://github.com/AbidReal">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.385.6.113.793-.258.793-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.386-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.836 2.807 1.305 3.488.997.108-.772.417-1.305.757-1.605-2.65-.3-5.436-1.325-5.436-5.89 0-1.302.465-2.366 1.236-3.196-.124-.302-.535-1.517.117-3.16 0 0 1.003-.32 3.29 1.226.954-.266 1.977-.398 3-.404 1.022.006 2.046.138 3 .404 2.285-1.546 3.287-1.226 3.287-1.226.654 1.643.243 2.858.118 3.16.77.83 1.234 1.894 1.234 3.196 0 4.574-2.79 5.586-5.44 5.882.426.368.805 1.096.805 2.214 0 1.6-.015 2.887-.015 3.277 0 .319.192.694.798.577C20.565 21.797 24 17.303 24 12c0-6.627-5.373-12-12-12"></path>
              </svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=100038736845651">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </div>
        <div>
          <span className="footer-title">Contact us</span>

          <a className="link link-hover"></a>
          <a className="link link-hover">FistZen@gamil.com</a>
          <a className="link link-hover">Dhaka/Bangladesh</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cooky policy</a>
        </div>
      </footer>
      <footer className="footer footer-center p-4   bg-black text-white">
        <div>
          <p>Copyright © 2023 - All right reserved by FistZen</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
