# Proyecto Final: Patas y Garras

Este proyecto es la parte frontend del proyecto final de Rolling Code. Patas y Garras es un sistema donde vas a poder adquirir productos, reservar turnos con nuestros profesionales y adquirir nuestros planes para tu mascota.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Creación](#creación)
- [Integración Backend](#integraciónBackend)
- [Tecnologías](#tecnologías)
- [Deploy](#deploy)
- [Autores](#autores)

## Instalación

1. Clona este repositorio:
   bash
   git clone [Repositorio Frontend](https://github.com/LisandroMoreno/VeterinariaProyectoFinalFront.git)
2. Navega al directorio del proyecto:
   cd Escritorio/FrontVeterinaria/VeterinariaFront
3. Instala las dependencias:
   bash
   npm install
4. Crea un archivo .env en la raíz del proyecto y configura las siguientes variables de entorno:
   env
   VITE_URL_BACK_LOCAL=http://localhost:3001
   VITE_URL_BACK_DEPLOY=https://proyecto-veterinaria-back-end.vercel.app
   VITE_API_KEY =

## Uso

1. Inicia el servidor:
   bash
   npm run dev y luego para hacer uso de la aplicación hacer click en el enlace que te será proporcionado.

## Creación

Para el proceso de creación de este proyecto tuvimos que cumplir con los siguientes requerimientos:

## Requerimientos

-PAGINA PRINCIPAL
La página principal debe contener información destacada de la veterinaria, servicios que ofrece, algunos
productos que pueden ser adquiridos en la veterinaria, publicidad de marcas con las que trabajamos,
además de comentarios de nuestros clientes, también se debe mostrar los profesionales que trabajan con
nosotros. Nuestra veterinaria actualmente ofrece un servicio especial mensual para nuestras mascotas al
estilo de una obra social, por lo que cuenta con 3 planes:
\_Plan: primeros pasos: servicios para mascotas de 0 a 5 años
\_Madurando: servicios para mascotas de 5 a 10 años
\_Adultos: servicios para mascotas de más de 10 años.
Al seleccionar cualquiera de los tres planes se lo enviara a una página “apartado página detalle de planes”
donde ampliamos como trabajará esa página.
Información de interés
En la página principal mostrar donde los diseñadores crean oportuno la información del clima actual en
nuestra región.
NOTA: la información del clima, se modifica constantemente por lo que queremos tomar estos datos de
alguna API de confianza del grupo de desarrolladores. Si los desarrolladores lo consideran necesario,
pueden mostrar algunos de los datos estáticos mencionados anteriormente en otras páginas del sitio por
cuestiones de diseño.

-DETALLES DE NAVBAR
El navbar debe mostrar el logo de la empresa, el botón de login para los usuarios con los permisos
suficientes, solo en el caso de ser administradores además se deberá mostrar las opciones para administrar
pacientes y turnos. El resto de opciones necesarias se deja a criterio del equipo de desarrolladores.

-DETALLES DE FOOTER
El footer debe contar con las redes sociales de la veterinaria, información de la ubicación, teléfonos y toda
la información extra que quisieran incluir.

-PAGINA DETALLE DE PLANES
Al seleccionar consultar cualquier plan de la página principal, se debe dirigir a los usuarios a una página
con un formulario de consulta el cual contendrá toda la información necesaria para que nos pongamos en
contacto con la persona interesada en el plan, al enviar la consulta se debe responder de manera automática
al mail del solicitante un mensaje indicando que próximamente nos contactaremos para informarle más del
plan, para esto se puede usar la librería EmailJS

-LOGIN
Puede ser una página o ventana modal, con los datos necesarios para loguear a los usuarios. En la primera
versión debe permitir ingresar al menos al usuario administrador, con las credenciales necesarias, la
contraseña del administrador debe estar encriptada y no puede ser visible, para ello pueden usar la
siguiente librería https://www.npmjs.com/package/bcryptjs.

-PAGINA PRINCIPAL DEL ADMINISTRADOR
La página principal de administración debe contener una bienvenida al administrador del sistema y
opcionalmente información de la versión del sistema. Además debe mostrar de forma sencilla los turnos
que ya se encuentran asignados. (Esta página la usara la persona que se encarga de administrar las fichas
de pacientes y turnos, por lo que este dato es fundamental)
Al ingresar como usuario administrador, se habilitarán nuevas opciones en el menú:
*Administrar pacientes: la cual nos llevara a una página para trabajar un CRUD de pacientes
*Administrar turnos: la cual nos llevara a una página para trabajar un CRUD de turnos

-ADMINISTRAR PACIENTES:
La ficha de los pacientes deberá contener toda la información necesaria del mismo, para ello se sugiere las
siguientes:
Información de dueños
\_Nombre
\_Apellido
\_Email
\_Teléfono
Información de mascota
\_Nombre
\_Especie
\_Raza
Nota: Si los desarrolladores lo consideran pueden agregar más datos.

-ADMINISTRAR TURNOS
Los turnos deben contener por lo menos la siguiente información:
\_Detalle de cita
\_Veterinario
\_Mascota
\_Fecha
\_Hora
Importante: Para trabajar los turnos considerar que nuestra veterinaria tiene dos veterinarios, los cuales
trabajan de Lunes a viernes 8hs diarias.

## PAGINAS INFORMATIVAS

-PAGINA ACERCA DE NOSOTROS
Esta página contendrá información del equipo que desarrolló esta web, alguna frase que hable del equipo y
debajo una galería donde se visualice una foto o avatar de cada miembro del equipo, seguido por el nombre
de cada uno.

-PAGINA ERROR 404
Diseñar una web con el error 404, esta página deberá ser llamada desde todos los botones o link de nuestro
sitio que no tengan una funcionalidad establecida.

-PAGINA DE CONTACTO
Realizar el diseño que considere conveniente, el formulario debe ser completamente validado.
Requerimientos optativos

-REGISTRO DE USUARIOS Y RESERVA DE TURNO
Agregar una sección de registro de usuarios, los usuarios registrados deberán poder loguarse al sitio y ser
administrados desde el panel del administrador. El objetivo de que un usuario pueda ingresar a nuestro
sitio es para que pueda reservar su turno sin recurrir al administrador. Para esto diseñar las pantallas que
considere necesarias.

-CRUD DE SERVICIOS
Agregar en el administrador una sección para poder administrar los servicios que ofrece la veterinaria,
estos serán los mismos que se observa en la página principal y además podrán ser seleccionados al
momento de solicitar un turno, agregándolos como una lista desplegable. El administrador debe poder
realizar todos los pasos de este CRUD.

-PAGINACIÓN
Como una mejora en los lugares donde podría existir mucha información como las tablas de pacientes en el
panel del administrador, podemos cargar los datos por tandas de por ejemplo 15 pacientes por página,
agregando un componente que nos permita controlar mejor la cantidad de datos a mostrar (paginado)

## IntegraciónBackend

Para el completo funcionamiento de este proyecto tuvimos que integrarlo a su backend correspondiente donde se utilizó un sistema de gestión de bases de datos no relacional llamado MongoDB.

Para echarle un vistazo al repositorio del back ingresar en el siguiente link :
[Repositorio Backend](https://github.com/Jose-Martin-Fe/ProyectoVeterinariaBackEnd)

## Tecnologías

Para hacer uso de diferentes estilos, iconos, validar formularios entre otras cosas decidimos utilizar las siguientes librerías:

    "axios": "^1.7.2",
    "bootstrap": "^5.3.3",
    "date-fns": "^3.6.0",
    "formik": "^2.4.6",
    "mercadopago": "^2.0.9",
    "moment-timezone": "^0.5.45",
    "react": "^18.3.1",
    "react-bootstrap": "^2.10.2",
    "react-datepicker": "^6.9.0",
    "react-dom": "^18.3.1",
    "react-icons": "^5.2.1",
    "react-rating-stars-component": "^2.2.0",
    "react-router-dom": "^6.23.0",
    "sweetalert2": "^11.10.8",
    "yup": "^1.4.0"

## Deploy

Para visitar el deploy del proyecto hacer click en el siguiente enlace :
[PatasyGarras](https://veterinaria-proyecto-final-front.vercel.app/)

## Autores

| Nombre                  | Perfil GitHub                                       |
| ----------------------- | --------------------------------------------------- |
| Rodrigo Paz             | [Rodrigopz52](https://github.com/Rodrigopz52)       |
| Jose Martin Fe          | [Jose-Martin-Fe](https://github.com/Jose-Martin-Fe) |
| Lisandro Nicolas Moreno | [LisandroMoreno](https://github.com/LisandroMoreno) |
