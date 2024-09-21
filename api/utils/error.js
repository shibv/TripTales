export const errorHandler = (statusCode, message) => {
    console.log("jbwjdjwi")
    const error = new Error(message);
    error.statusCode    = statusCode
    error.message = message

    return error
    
}