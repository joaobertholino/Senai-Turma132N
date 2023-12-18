// Selecionando elementos do HTML
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");
const repeatPasswordInput = document.querySelector("#repeat-password-input");
const emailLabel = document.querySelector("#email-label");
const passwordLabel = document.querySelector("#password-label");
const repeatPasswordLabel = document.querySelector("#repeat-password-label");
const subtitle = document.querySelector("#paragraph-top");
const btnLogin = document.querySelector("#btn-login");
const showPassword = document.querySelector("#show-password");
const showLabelPassword = document.querySelector("#show-password-label");
const themeToggle = document.querySelector("#themeToggle");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

// REGEX
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Definindo funções DOM
const dataNotValid = () => {
  subtitle.style.fontWeight = 600;
  subtitle.style.color = "#d62828";
  emailInput.style.border = "1px solid #d62828";
  emailLabel.style.color = "#d62828";
  passwordInput.style.border = "1px solid #d62828";
  passwordLabel.style.color = "#d62828";
  repeatPasswordInput.style.border = "1px solid #d62828";
  repeatPasswordLabel.style.color = "#d62828";
  subtitle.textContent = "Dados não inseridos!";
};

const dataValid = () => {
  subtitle.style.fontWeight = 600;
  subtitle.style.color = "#2a9d8f";
  emailInput.style.border = "1px solid #2a9d8f";
  emailLabel.style.color = "#2a9d8f";
  passwordInput.style.border = "1px solid #2a9d8f";
  passwordLabel.style.color = "#2a9d8f";
  repeatPasswordInput.style.border = "1px solid #2a9d8f";
  repeatPasswordLabel.style.color = "#2a9d8f";
  subtitle.textContent = "Dados corretos!";
};

const emailNotValid = () => {
  subtitle.style.fontWeight = 600;
  subtitle.style.color = "#d62828";
  emailInput.style.border = "1px solid #d62828";
  emailLabel.style.color = "#d62828";
  subtitle.textContent = "Email incorreto ou não inserido!";
};

const emailValid = () => {
  subtitle.style.fontWeight = 600;
  subtitle.style.color = "#2a9d8f";
  emailInput.style.border = "1px solid #2a9d8f";
  emailLabel.style.color = "#2a9d8f";
  subtitle.textContent = "Email correto!";
};

const passwordNotValid = () => {
  subtitle.style.fontWeight = 600;
  subtitle.style.color = "#d62828";
  passwordInput.style.border = "1px solid #d62828";
  passwordLabel.style.color = "#d62828";
  subtitle.textContent = "Senha incorreta ou não inserida!";
};

const passwordValid = () => {
  subtitle.style.fontWeight = 600;
  subtitle.style.color = "#2a9d8f";
  passwordInput.style.border = "1px solid #2a9d8f";
  passwordLabel.style.color = "#2a9d8f";
  subtitle.textContent = "Senha correta!";
};

const repeatPasswordNotValid = () => {
  subtitle.style.fontWeight = 600;
  subtitle.style.color = "#d62828";
  repeatPasswordInput.style.border = "1px solid #d62828";
  repeatPasswordLabel.style.color = "#d62828";
  subtitle.textContent = "Senha não corresponde ou não inserida!";
};

const repeatPasswordValid = () => {
  subtitle.style.fontWeight = 600;
  subtitle.style.color = "#2a9d8f";
  repeatPasswordInput.style.border = "1px solid #2a9d8f";
  repeatPasswordLabel.style.color = "#2a9d8f";
  subtitle.textContent = "Senha corresponde!";
};

// Função para definir o tema de acordo com a preferência do sistema
const setSystemTheme = () => {
  switch (window.matchMedia && systemTheme.matches) {
    case true:
      themeToggle.setAttribute("href", "CSS/dark-theme-login.css");
      break;
    default:
      themeToggle.setAttribute("href", "CSS/light-theme-login.css");
      break;
  }
};
window.onload = setSystemTheme;
systemTheme.addEventListener("change", setSystemTheme);

// Estrutura condicional para validação dos dados inseridos pelo usuário nos inputs
emailInput.addEventListener("input", () => {
  switch (true) {
    case !emailRegex.test(emailInput.value) || emailInput.value === "":
      emailNotValid();
      break;
    default:
      emailValid();
      break;
  }
});

passwordInput.addEventListener("input", () => {
  switch (true) {
    case !passwordRegex.test(passwordInput.value) || passwordInput.value === "":
      passwordNotValid();
      break;
    default:
      passwordValid();
      break;
  }
});

repeatPasswordInput.addEventListener("input", () => {
  switch (true) {
    case repeatPasswordInput.value !== passwordInput.value || repeatPasswordInput.value === "":
      repeatPasswordNotValid();
      break;
    default:
      repeatPasswordValid();
      break;
  }
});

btnLogin.addEventListener("click", (event) => {
  switch (true) {
    case emailInput.value === "" && passwordInput.value === "" && repeatPasswordInput.value === "":
      event.preventDefault();
      dataNotValid();
      break;
    case !emailRegex.test(emailInput.value):
      event.preventDefault();
      emailNotValid();
      break;
    case !passwordRegex.test(passwordInput.value):
      event.preventDefault();
      passwordNotValid();
      break;
    case repeatPasswordInput.value !== passwordInput.value:
      event.preventDefault();
      repeatPasswordNotValid();
      break;
    default:
      event.preventDefault();
      dataValid();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      break;
  }
});

// Evento para mostrar senha no input
showPassword.addEventListener("click", () => {
  switch (passwordInput.type && repeatPasswordInput.type) {
    case "password":
      passwordInput.type = "text";
      repeatPasswordInput.type = "text";
      showLabelPassword.textContent = "Ocultar minha senha.";
      break;
    default:
      passwordInput.type = "password";
      repeatPasswordInput.type = "password";
      showLabelPassword.textContent = "Mostrar minha senha.";
      break;
  }
});
