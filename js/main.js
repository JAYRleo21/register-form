const patterns = {
  user: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	phone: /^\d{7,14}$/ // 7 a 14 digitos.
}
const formFields = [
  {
    label: 'Usuario',
    name: 'user',
    pattern: patterns.user,
    placeholder: 'usuario123',
    helpMessage: 'El usuario debe tener entre 4 y 16 caracteres y solo puede contener números, letras y guión bajo.',
    type: 'text',
    valid: false
  },{
    label: 'Nombre',
    name: 'name',
    pattern: patterns.name,
    placeholder: 'Nombre Usuario',
    helpMessage: 'El nombre debe tener entre 4 y 25 caracteres y solo puede contener letras.',
    type: 'text',
    valid: false
  },{
    label: 'Contraseña',
    name: 'password',
    pattern: patterns.password,
    placeholder: '******',
    helpMessage: 'La contraseña debe tener entre 4 y 12 caracteres.',
    type: 'password',
    valid: false
  },{
    label: 'Repite tu contraseña',
    name: 'password2',
    pattern: patterns.password,
    placeholder: '******',
    helpMessage: 'Ambas contraseñas deben ser iguales.',
    type: 'password',
    valid: false
  },{
    label: 'Correo electrónico',
    name: 'email',
    pattern: patterns.email,
    placeholder: 'usuario@mail.com',
    helpMessage: 'El formato del correo debe ser por ejemplo "minombre@gmail.com"',
    type: 'mail',
    valid: false
  },{
    label: 'Teléfono',
    name: 'phone',
    pattern: patterns.phone,
    placeholder: '12345678',
    helpMessage: 'El telefono solo puede contener números entre 6 y 14 dígitos.',
    type: 'tel',
    valid: false
  }
];

const form = document.getElementById('form');
const inputTemplate = document.getElementById('inputTemplate');
const terms = document.getElementById('terms');
const fieldsContainer = document.getElementById('fieldsContainer');
const formMessage = document.getElementById('formMessage');
const btnSubmit = document.getElementById('btnSubmit');

//ENVIAR FORMULARIO
form.addEventListener('submit', e => {
  btnSubmit.disabled = true;
  e.preventDefault();
  let formData = {
    user: form.elements['user'].value,
    name: form.elements['name'].value,
    password: form.elements['password'].value,
    email: form.elements['email'].value,
    phone: form.elements['phone'].value
  }
  let formFieldsValid = true;
  formFields.forEach(element => {
    if(!element.valid){
      formFieldsValid = false;
    }
  });
  if(terms.checked && formFieldsValid){
    console.log('Send', terms.checked, formData);
    formMessage.innerHTML = 'Enviando...';
    setTimeout(()=>{
      formMessage.innerHTML = 'Registo creado correctamente';
      setTimeout(()=>{
        formMessage.innerHTML = '';
        btnSubmit.disabled = false;
        cleanForm();
      }, 3000);
    }, 3000);
  }else{
    if(!formFieldsValid){
      formMessage.innerHTML = 'Debe llenar el formulario correctamente';
      setTimeout(()=>{
        formMessage.innerHTML = '';
        btnSubmit.disabled = false;
      }, 3000);
    }else{
      formMessage.innerHTML = 'Es necesario aceptar los términos y condiciones';
      setTimeout(()=>{
        formMessage.innerHTML = '';
        btnSubmit.disabled = false;
      }, 3000);
    }
  }
  console.log(terms.checked, formData);
})

//CREAR CAMPOS DEL FORMULARIO
formFields.forEach(element => {
  inputTemplate.content.querySelector('.form-group').id = `group${element.name}`;
  let labelElement = inputTemplate.content.querySelector('.input-label');
  labelElement.innerHTML = element.label;
  labelElement.htmlFor = element.name;
  let inputElement = inputTemplate.content.querySelector('.input-group input');
  inputElement.placeholder = element.placeholder;
  inputElement.name = element.name;
  inputElement.id = element.name;
  inputElement.type = element.type;
  if(element.type == 'password'){
    inputElement.autocomplete = 'off';
  }
  inputTemplate.content.querySelector('.input-help').innerHTML = element.helpMessage;
  fieldsContainer.appendChild(inputTemplate.content.cloneNode(true));
  let inputDOM = document.getElementById(element.name);
  element.container = document.getElementById(`group${element.name}`);
  inputDOM.addEventListener('input', e => {
    console.log(e.target.id, e.target.value);
    if(e.target.id == 'password2'){
      validatepassword2(e.target.value);
    }else{
      validate(e.target.id, e.target.value);
    }
  });
});

//FUNCIONES DE VALIDACIÓN
function validate(fieldName, inputValue){
  let field = formFields.find( field => field.name == fieldName);
  if(field.pattern.test(inputValue)){
    field.container.classList.remove('has-error');
    field.container.classList.add('is-valid');
    field.valid = true;
  }else{
    field.container.classList.remove('is-valid');
    field.container.classList.add('has-error');
    field.valid = false;
  }
};
function validatepassword2(inputValue){
  let password = document.getElementById('password');
  let password2 = formFields.find( field => field.name == 'password2');
  if(password.value == inputValue){
    password2.container.classList.remove('has-error');
    password2.container.classList.add('is-valid');
    password2.valid = true;
  }else{
    password2.container.classList.remove('is-valid');
    password2.container.classList.add('has-error');
    password2.valid = false;
  }
};

//LIMPIAR FORMULARIO
function cleanForm(){
  form.reset();
  formFields.forEach(element => {
    element.container.classList.remove('is-valid');
    element.valid = false;
  });
}
