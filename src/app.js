const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const exphbs = require("express-handlebars"); // Importa express-handlebars

const app = express();

// Configuración de Handlebars
app.set("views", path.join(__dirname, "views"));
app.set("view engine", ".hbs");
app.use(express.static(path.join(__dirname, "public")));

// Conección a la base de datos
const connection = mysql.createConnection({
    host: "localhost",
    user: "usuario",
    password: "contraseña",
    database: "nombre_de_la_base_de_datos",
    port: 3306
});

// Verificar la conexión
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
        return;
    }
    console.log('Conexión a la base de datos MySQL establecida correctamente');
});

// Ruta para la página principal
app.get('/principal', (req, res) => {
    res.render('principal/home'); // Renderiza la vista 'home.hbs'
});



// Ruta para la página principal
app.get('/servicios', (req, res) => {
    res.render('servicios/servicios.hbs'); // Renderiza la vista 'home.hbs'
});



// Endpoint para recibir mensajes del chatbot
app.post('/chatbot', (req, res) => {
    const message = req.body.message;

    // Aquí puedes implementar la lógica del chatbot para procesar el mensaje y generar una respuesta
    const response = generateResponse(message);

    res.json({ response });
});




// Ruta para manejar el envío del formulario
app.post('/enviar', (req, res) => {
    const { nombre, correo, telefono, mensaje } = req.body;
  
    // Configura el transporter de Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Puedes usar otros servicios como Yahoo, Outlook, etc.
      auth: {
        user: 'andreafrancocontadora@gmail.com',
        pass: 'gnpkqjpgbbnsbmnd',
      },
    });
  
    const mailOptions = {
      from: correo,
      to: 'andreafrancocontadora@gmail.com',
      subject: 'Nuevo mensaje del formulario de contacto',
      text: `Nombre: ${nombre}\nCorreo: ${correo}\nTeléfono: ${telefono}\nMensaje:\n${mensaje}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Hubo un error al enviar el mensaje. Por favor, inténtelo de nuevo.');
      } else {
        console.log('Correo enviado: ' + info.response);
        res.status(200).send('El mensaje se ha enviado correctamente.');
      }
    });
  });


function generateResponse(message) {
    // Aquí puedes implementar la lógica para generar la respuesta del chatbot
    // Por ejemplo, puedes usar una librería de procesamiento del lenguaje natural (NLP) como Natural o comprender la intención del usuario y generar una respuesta apropiada.
    // Por ahora, simplemente devolveremos un mensaje de ejemplo
    return "¡Hola! Soy un chatbot. ¿En qué puedo ayudarte?";
}













// Ruta para la página principal
app.get('/contacto', (req, res) => {
    res.render('servicios/contacto.hbs'); // Renderiza la vista 'home.hbs'
});






// Ruta para la página principal
app.get('/informacion', (req, res) => {
    res.render('servicios/informacion.hbs'); // Renderiza la vista 'home.hbs'
});




















// Iniciar el servidor
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
