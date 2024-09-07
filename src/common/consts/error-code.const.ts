export class ErrorCode {
    public static readonly EMAIL_PASSWORD_INCORRECT = new ErrorCode("0001", "Email or Password incorrect"); 
    public static readonly ACCESS_TOKEN_OR_API_KEY_INVALID = new ErrorCode("0001", "Unauthorized"); 
    
    private constructor(
        public readonly code: string,
        public readonly message: string
    ) {}
}