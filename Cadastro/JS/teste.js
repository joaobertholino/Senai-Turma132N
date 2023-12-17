const selectElement = (selector) => document.querySelector(selector);

const elements = {
  emailInput: selectElement("#email-input"),
  passwordInput: selectElement("#password-input"),
  repeatPasswordInput: selectElement("#repeat-password-input"),
  emailLabel: selectElement("#email-label"),
  passwordLabel: selectElement("#password-label"),
  repeatPasswordLabel: selectElement("#repeat-password-label"),
  subtitle: selectElement("#paragraph-top"),
  btnLogin: selectElement("#btn-login"),
  showPassword: selectElement("#show-password"),
  showLabelPassword: selectElement("#show-password-label"),
  themeToggle: selectElement("#themeToggle"),
  systemTheme: window.matchMedia("(prefers-color-scheme: dark)"),
};

// REGEX
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const applyStyles = (color, borderColor) => {
  const styleProperties = ['fontWeight', 'color', 'border'];
  styleProperties.forEach((property) => {
    elements.subtitle.style[property] = elements.emailInput.style[property] = elements.passwordInput.style[property] = elements.repeatPasswordInput.style[property] = color;
    elements.emailLabel.style.color = elements.passwordLabel.style.color = elements.repeatPasswordLabel.style.color = color;
  });
  elements.emailInput.style.border = elements.passwordInput.style.border = elements.repeatPasswordInput.style.border = `1px solid ${borderColor}`;
};

const updateSubtitle = (text, color) => {
  elements.subtitle.textContent = text;
  elements.subtitle.style.fontWeight = 600;
  elements.subtitle.style.color = color;
};

const setTheme = () => {
  const themePath = elements.systemTheme.matches ? "CSS/dark-theme-login.css" : "CSS/light-theme-login.css";
  elements.themeToggle.setAttribute("href", themePath);
};

const handleInput = (input, regex, notValidFunc, validFunc) => {
  const isValid = regex.test(input.value) && input.value !== "";
  isValid ? validFunc() : notValidFunc();
};

// Event listeners
elements.emailInput.addEventListener("input", () => handleInput(elements.emailInput, emailRegex, emailNotValid, emailValid));
elements.passwordInput.addEventListener("input", () => handleInput(elements.passwordInput, passwordRegex, passwordNotValid, passwordValid));
elements.repeatPasswordInput.addEventListener("input", () => {
  const isRepeatValid = elements.repeatPasswordInput.value === elements.passwordInput.value && elements.repeatPasswordInput.value !== "";
  isRepeatValid ? repeatPasswordValid() : repeatPasswordNotValid();
});

elements.btnLogin.addEventListener("click", (event) => {
  event.preventDefault();
  const emailIsValid = emailRegex.test(elements.emailInput.value);
  const passwordIsValid = passwordRegex.test(elements.passwordInput.value);
  const repeatPasswordIsValid = elements.repeatPasswordInput.value === elements.passwordInput.value && elements.repeatPasswordInput.value !== "";

  if (!emailIsValid || !passwordIsValid || !repeatPasswordIsValid) {
    dataNotValid();
  } else {
    dataValid();
    setTimeout(() => window.location.reload(), 2000);
  }
});

elements.showPassword.addEventListener("click", () => {
  const isPasswordVisible = elements.passwordInput.type === "text";
  elements.passwordInput.type = elements.repeatPasswordInput.type = isPasswordVisible ? "password" : "text";
  elements.showLabelPassword.textContent = isPasswordVisible ? "Mostrar minha senha." : "Ocultar minha senha.";
});

// Initial setup
window.onload = () => {
  setTheme();
  elements.systemTheme.addEventListener("change", setTheme);
};