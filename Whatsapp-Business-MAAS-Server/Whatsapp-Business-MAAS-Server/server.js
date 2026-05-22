import app from './app.js';

const port = process.env.PORT || 8080;

// if(process.env.NODE_ENV !=='PRODUCTION'){
//     dotenv.config({path:'config/config.env'})
// }

const server = app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
    // connectDatabase();
});