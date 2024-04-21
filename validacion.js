const $form = document.querySelector("#form");
const inputs = document.querySelectorAll(
  "#form input[name], #form textarea[name]"
);
const textarea = document.querySelector("#form textarea[name='mensaje']");

const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,50}$/,
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  asunto: /^[a-zA-ZÀ-ÿ\s]{1,20}$/,
  mensaje: /^[a-zA-ZÀ-ÿ0-9\s]{1,200}$/,
};

const campos = {
  nombre: false,
  email: false,
  asunto: false,
  mensaje: false,
};

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "nombre":
    case "email":
    case "asunto":
      validarCampo(expresiones[e.target.name], e.target, e.target.name);
      break;
    case "mensaje":
      validarCampo(expresiones.mensaje, textarea, "mensaje");
      break;
  }
};

const validarCampo = (expresion, input, campo) => {
  const icono = input.parentElement.querySelector(".validar-estado");
  if (expresion.test(input.value)) {
    input.parentElement.classList.remove("incorrecto");
    input.parentElement.classList.add("correcto");
    icono.classList.remove("fa-times-circle");
    icono.classList.add("fa-check-circle");
    campos[campo] = true;
  } else {
    input.parentElement.classList.add("incorrecto");
    input.parentElement.classList.remove("correcto");
    icono.classList.add("fa-times-circle");
    icono.classList.remove("fa-check-circle");
    campos[campo] = false;
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
  validarFormulario({ target: input }); // Validación inicial
});

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  // Validar todos los campos antes de enviar el formulario
  for (let campo in campos) {
    if (!campos[campo]) {
      alert("Por favor, complete todos los campos correctamente.");
      return;
    }
  }
  // Si todos los campos son válidos, enviar el formulario
  const form = new FormData($form);
  const mensaje = form.get("mensaje");
  const subject = `Asunto: ${form.get("asunto") || "Sin asunto"}`;
  const body = `Nombre: ${form.get("nombre") || "Sin nombre"}\nEmail: ${
    form.get("email") || "Sin email"
  }\n${mensaje}`;
  window.open(
    `mailto:chinaski2025@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`
  );
});
