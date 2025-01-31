export class ErrorCode {
    public static readonly EMAIL_PASSWORD_INCORRECT = new ErrorCode("0001", "Email or Password incorrect"); 
    public static readonly ACCESS_TOKEN_OR_API_KEY_INVALID = new ErrorCode("0002", "Unauthorized"); 
    public static readonly DELETE_BOT_ERROR = new ErrorCode("0003", "Can't delete the bot"); 
    public static readonly JWT_API_KEY_ERROR = new ErrorCode("0004", "Access Token or API Key not allowed");
    
    private constructor(
        public readonly code: string,
        public readonly message: string
    ) {}
}