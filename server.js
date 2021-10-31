const express = require ('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session'); 
const PassportLocal = require('passport-local').Strategy; // clase estrategy para configurar estrategia de logeo (clave gmail, redes)

const app = express();

// leer los datos enviados por un form (lee el body)
app.use(express.urlencoded({extended: true}));

//manejar sesiones
app.use(cookieParser('mi ultra mayor secreto'));

app.use(session({
    secret: 'mi ultra mayor secreto',
    resave: true,           // vuelve a guardar sesion sin modificar (true)
    saveUnitialized: true   // sesion se conserva aun si cargar nada (true)
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new PassportLocal(function(username, password, done){
    if(username === "jose" && password === "1234")
        return done(null,{ id:1, name: "jose" });
    done(null, false);
}));

// { id:1, name: "jose" }
// GUARDO id:1 => serializacion 
passport.serializeUser(function(user, done){
    done(null,user.id);
});
// los usuarios deberian buscarse en la base de datos
// Deserializacion
// con el id:1 recupero el resto
passport.deserializeUser(function(id,done){
    done(null, {id: 1, name: "jose"});
});


app.set('view engine', 'ejs');  // motor de vistas para ver el html

app.get("/", (req, res) => {
    // iniciada sesion bienvenida

    // sin sesion iniciada redireccionar loguin
    res.send("Hola felicitaciones!!!! Has iniciado sesion.")
})

app.get("/login", (req,res) => {
    // Mostrar form de login
    res.render("login");
});

app.post("/login", passport.authenticate('local', {
    // recibir credenciales o iniciar sesion
    successRedirect: "/",
    failureRedirect: "/login"
}));

app.listen(8080,() => console.log("Server Started")); // inicio del servidor