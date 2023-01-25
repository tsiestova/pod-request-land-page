import "./style.scss";

class App {
  constructor() {
    this.form = document.querySelector("#form");
    this.textContainer = document.querySelector(".form__message");
    this.button = document.querySelector(".btn__request");
    this.emailInput = document.querySelector("#email");
    this.emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  }

  addEventListeners() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));

    // this.emailInput.addEventListener("blur", (e) => this.handleChangeInput(e));

    this.emailInput.addEventListener("blur", (e) => this.handleInput(e));
    this.emailInput.addEventListener("focus", (e) => this.handleInput(e));
    this.emailInput.addEventListener("keypress", (e) => this.handleInput(e));
  }

  handleFocus(e) {
    if (e.key === "Enter") {
      this.textContainer.textContent = "Oops! Please add your email";
      this.button.disabled = true;
    }

    this.textContainer.textContent = "";
    this.button.disabled = false;
  }

  handleInput(e) {
    const eventType = e.type;
    const inputValue = e.target.value;
    const condition1 =
      !inputValue.length || !inputValue.match(this.emailPattern);

    const condition2 = condition1 && e.key === "Enter";

    if ((eventType === "blur" && condition1) || (condition1 && condition2)) {
      this.textContainer.textContent = "Oops! Please add your email";
      this.button.disabled = true;
    }

    if (e.key !== "Enter" && eventType !== "blur") {
      this.textContainer.textContent = "";
      this.button.disabled = false;
    }

    if (eventType === "focus") {
      this.textContainer.textContent = "";
      this.button.disabled = false;
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const form = e.target;

    const userEmail = form["user-email"].value;

    // if (!userEmail.length || !userEmail.match(this.emailPattern)) {
    //   this.textContainer.textContent = "Oops! Please add your email";
    //   return;
    // }

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
        //this.textContainer.textContent = "";
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
