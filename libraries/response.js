class SuccessResponse {
    constructor(builder) {
        this.error = builder.error || false;
        this.message = builder.message;
        this.status = builder.status || 200;
        this.data = builder.data;
    }
}

class ErrorResponse {
    constructor(builder) {
        this.error = builder.error || true;
        this.message = builder.message || 'Something went wrong, please try again later!!!';
        this.status = builder.status;
        this.data = builder.data;
        this.errorCode = builder.errorCode;
        this.errorType = builder.hasOwnProperty('errorType') === true ? builder.errorType : 'UnknownError';
    }
}

module.exports = {
    SuccessResponse: SuccessResponse,
    ErrorResponse: ErrorResponse
}