document.querySelector("main").addEventListener("click", (evt) => {
  if (evt.target.tagName === "SUMMARY") {
    [...document.querySelectorAll("details")].forEach((detail) =>
      detail.removeAttribute("open")
    );
  }
});
