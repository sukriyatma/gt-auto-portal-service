import { compare, genSalt, hash } from "bcrypt";
import { randomBytes } from "crypto";

export class PasswordUtil {

    public static async passwordEncoder(password: string): Promise<string> {
        const salt = await genSalt(10);
        return await hash(password, salt);
    }

    public static async passwordCompare(password: string, existPassword: string): Promise<boolean> {
        return await compare(password, existPassword);
    }

    public static apiKeyGenerator(): string {
        return randomBytes(32).toString('base64')
    }
}