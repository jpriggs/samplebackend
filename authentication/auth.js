require('dotenv').config()

const users = [];
const raw = [
  process.env.a_sesh,
  process.env.g_sesh,
  process.env.m_sesh,
  process.env.t_sesh,
];

for (r of raw) {
  const parts = r.split(',')
  const u = {name: parts[0], pass: parts[1]};
  users.push(u);
}

const check = (name, pass) => {
    let valid = false;
    users.forEach((user) =>  {
        if(name === user.name) {
            if (pass === user.pass) {
                valid = true;
                return;
            }
        }
    });
    return valid;
}
const basicAuth = (req, res, next) => {
    const authString = new Buffer.from(req.headers.authorization.split(" ")[1], 'base64').toString()
    const authParts = authString.split(':');
    if (check(authParts[0], authParts[1])) {
        return next()
    }

    res.set('WWW-Authenticate', 'Basic realm="401"');   
    return res.status(401).send("Authentication required"); 
}; 

module.exports = basicAuth;