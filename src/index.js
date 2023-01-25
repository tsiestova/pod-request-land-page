import "./style.scss";

class App {
  constructor() {
    this.form = document.querySelector("#form");
    this.textContainer = document.querySelector(".form__message");
    this.button = document.querySelector(".btn__request");
    this.emailInput = document.querySelector("#email");
  }

  addEventListeners() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));

    this.emailInput.addEventListener("blur", (e) => this.handleBlur(e));
    this.emailInput.addEventListener("focus", (e) => this.handleFocus(e));
    this.emailInput.addEventListener("keypress", (e) => this.handleKeypress(e));
  }

  isValidEmail(value) {
    const pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const result = !value.length || !value.match(pattern);

    return !result;
  }

  handleBlur(e) {
    const value = e.target.value;
    const validation = this.isValidEmail(value);

    if (!validation) {
      this.textContainer.textContent = "Oops! Please add your email";
      this.button.disabled = true;
    }
  }

  handleFocus() {
    this.textContainer.textContent = "";
    this.button.disabled = false;
  }

  handleKeypress(e) {
    const value = e.target.value;
    const validation = this.isValidEmail(value);
    if (e.key === "Enter" && !validation) {
      this.textContainer.textContent = "Oops! Please add your email";
      this.button.disabled = true;
      this.emailInput.blur();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const userEmail = form["user-email"].value;
    const validation = this.isValidEmail(userEmail);
    console.log(userEmail);

    if (!validation) {
      return;
    }

    this.button.disabled = true;
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
      }),
    })
      .then((data) => {
        this.form.reset();
        this.button.disabled = false;
      })

      .catch((e) => {
        console.log(e);
      });
  }

  init() {
    this.addEventListeners();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new App();

  app.init();
});
