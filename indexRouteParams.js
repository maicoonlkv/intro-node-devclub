const express = require('express') //Importar Express
const port = 3000

const app = express() // colocar dentro da variável app
app.use(express.json()) 

app.get('/users/', (request, response) => {


    const {name, age, city} = request.body
    //console.log(request.body)

    return response.json({name, age, city})

})  //Criação da Rota

app.listen(3000, () => {
    console.log(`Server started on port ${port} 🚀`)
}) //Porta que a aplicação vai rodar 
