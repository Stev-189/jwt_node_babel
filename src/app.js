import express from 'express'
const app= express();
import router from './controllers/authController'

app.use(express.json());//retorna json
app.use(express.urlencoded({extended: false}));//acepta form

app.use(router)
export default app; 