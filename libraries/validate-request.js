module.exports = (req,...params) => {
    const reqValidityArr = [];
    params.forEach((param) => {
        if(typeof req.body[param] === 'undefined' || typeof req.body[param] === '' || typeof req.body[param] === null) {
            reqValidityArr.push(false);
        } else {
            reqValidityArr.push(true);
        }
    });
    return reqValidityArr;
}