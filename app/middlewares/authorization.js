function Admin (req, res, next) {
    const cookieJWT = req.headers.cookie.split(';')
    console.log('COOKIE', cookieJWT);
}

function Public (req, res, next) {

}

function Employes (req, res, next) {

}

function Inventory(req, res, next) {

}

function Sales (req, res, next) {

}

export const methods = {
    Admin,
    Public,
    Employes,
    Inventory,
    Sales,
}