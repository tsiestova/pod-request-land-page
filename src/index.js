import "./style.scss";

class App {
  constructor() {
    this.form = document.querySelector("#form");
    this.textContainer = document.querySelector(".form__message");
  }

  addEventListeners() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  handleSubmit(e) {
    e.preventDefault();

    const form = e.target;

    const userEmail = form["user-email"].value;

    const pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    if (!userEmail.length || !userEmail.match(pattern)) {
      this.textContainer.textContent = "Oops! Please add your email";
    } else {
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: userEmail,
        }),
      })
        .then((data) => {
          console.log(userEmail);
          this.form.reset();
          this.textContainer.textContent = "";
        })

        .catch((e) => {
          console.log(e);
        });
    }
  }

  init() {
    this.addEventListeners();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new App();

  app.init();
});
