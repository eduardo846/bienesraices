import bcrypt from 'bcrypt'
const usuarios = [
    {
        nombre: 'usuariop',
        email: 'usuariop@gmail.com',
        confirmado:1,
        password:bcrypt.hashSync('password',10)
    }
]

export default usuarios