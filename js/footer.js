const createFooter = () => {
  const footer = document.querySelector(".footer");

  footer.innerHTML = `
      <div class="footer-content">
        <img src="img/light-logo.png" alt="" class="footer-logo" />
        <div class="footer-ul-container">
          <ul class="category">
            <li class="category-title">Men</li>
            <li>
              <a href="#" class="footer-link">T-shirts</a>
            </li>
            <li>
              <a href="#" class="footer-link">Sweatshirts</a>
            </li>
            <li>
              <a href="#" class="footer-link">Shirts</a>
            </li>
            <li>
              <a href="#" class="footer-link">Jeans</a>
            </li>
            <li>
              <a href="#" class="footer-link">Trousers</a>
            </li>
            <li>
              <a href="#" class="footer-link">Shoes</a>
            </li>
            <li>
              <a href="#" class="footer-link">Casuals</a>
            </li>
            <li>
              <a href="#" class="footer-link">Formals</a>
            </li>
            <li>
              <a href="#" class="footer-link">Sport</a>
            </li>
            <li>
              <a href="#" class="footer-link">Watch</a>
            </li>
          </ul>
          <ul class="category">
            <li class="category-title">Women</li>
            <li>
              <a href="#" class="footer-link">T-shirts</a>
            </li>
            <li>
              <a href="#" class="footer-link">Sweatshirts</a>
            </li>
            <li>
              <a href="#" class="footer-link">Shirts</a>
            </li>
            <li>
              <a href="#" class="footer-link">Jeans</a>
            </li>
            <li>
              <a href="#" class="footer-link">Trousers</a>
            </li>
            <li>
              <a href="#" class="footer-link">Shoes</a>
            </li>
            <li>
              <a href="#" class="footer-link">Casuals</a>
            </li>
            <li>
              <a href="#" class="footer-link">Formals</a>
            </li>
            <li>
              <a href="#" class="footer-link">Sport</a>
            </li>
            <li>
              <a href="#" class="footer-link">Watch</a>
            </li>
          </ul>
        </div>
      </div>
      <p class="footer-title">About company</p>
      <p class="footer-info">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti quasi
        expedita non amet labore dolorem, adipisci praesentium dignissimos
        pariatur asperiores nostrum nam, similique, porro ipsam! Dolorum
        incidunt sapiente error voluptatibus dolores earum unde nisi inventore.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus maiores
        incidunt, alias vel ratione aspernatur? Lorem ipsum dolor sit, amet
        consectetur adipisicing elit. Quaerat magni veritatis excepturi quasi
        error ratione molestias quidem quibusdam. Non unde facere consequatur
        sint id officia, minima ullam animi reprehenderit aliquam!
      </p>
      <p class="footer-info">
        Support Emails - help@clothing.com, customersupport@clothing.com
      </p>
      <p class="footer-info">Telephone - 180 00 00 001, 180 00 00 002</p>
      <div class="footer-social-container">
        <div>
          <a href="#" class="footer-social-link">Terms & Services</a>
          <a href="#" class="footer-social-link">Privacy Policy</a>
        </div>
        <div>
          <a href="#" class="footer-social-link">Instagram</a>
          <a href="#" class="footer-social-link">Facebook</a>
          <a href="#" class="footer-social-link">Twitter</a>
        </div>
      </div>
      <div class="footer-credit">Clothing, Best apparels online store</div>
  `;
};

createFooter();
