app.post("/login", (req, res) => {
    console.log("Login pressed");
    console.log("Name: " + req.body.user_name);
    console.log("Passwort: " + req.body.user_passwort);
    res.end();
});
