export interface LoginForm {
    username: string;
    password: string;
}

export interface ChangePasswordForm {
    oldpassword: string;
    password: string;
    repassword: string;
}
