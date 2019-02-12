const {ErrorResponse, SuccessResponse} = require('./response');

class ErrorResponseBuilder {
    constructor(message) {
        this.message = message;
    }
    status(code) {
        this.status = code;
        return this;
    }
    data(data) {
        this.data = data;
        return this;
    }
    errorCode(errCode) {
        this.errorCode = errCode;
        return this;
    }
    errorType(errType) {
        this.errorType = errType;
        return this;
    }
    build() {
        return new ErrorResponse(this);
    }
}

class SuccessResponseBuilder {
    constructor(message) {
        this.message = message;
    }
    status(code) {
        this.status = code;
        return this;
    }
    data(data) {
        this.data = data;
        return this;
    }
    build() {
        return new SuccessResponse(this);
    }
}

module.exports = {
    SuccessResponseBuilder: SuccessResponseBuilder,
    ErrorResponseBuilder: ErrorResponseBuilder
}
