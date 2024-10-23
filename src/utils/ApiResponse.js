class ApiResponse {
    constructor(statusCode, message = "success", data = null){
        this.statusCode = statusCode,
        this.message = message,
        this.data = data
    }
    // method to loging response
    apiLoginRespse(data){
        return new ApiResponse(201, "Login successfully", data)
    }
    apiLogOutRespse(data){
        return new ApiResponse(201, "Logout successfully", data)
    }
}
export default ApiResponse