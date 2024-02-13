const express = require('express') //Importar Express
const port = 3000
const uuid = require('uuid')

const app = express() // colocar dentro da variável app
app.use(express.json()) //Toda aplicacao usa Json


const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex (user => user.id === id)

    if (index < 0) {
        return response.status(400).json({messager: "user not found"})
    }

    request.userIndex = index
    request.userId = id

    next()
}

app.get('/users', (request, response) => {
    return response.json(users)
    
})  //Criação da Rota

app.post('/users', (request, response) => {
    const {name, age} = request.body

    //console.log(uuid.v4())

    const user = {id:uuid.v4(), name, age}

    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id', checkUserId, (request, response) => {

    const {name,age} = request.body
    const index = request.userIndex
    const id = request.userId
    
    const updateUser = {id, name, age }

    users [index] = updateUser
    
    //console.log(index)

    return response.json(updateUser)

})

app.delete('/users/:id', checkUserId,  (request, response) => {
    
    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json()
    
}) 








app.listen(3000, () => {
    console.log(`Server started on port ${port} 🚀`)
}) //Porta que a aplicação vai rodar 
