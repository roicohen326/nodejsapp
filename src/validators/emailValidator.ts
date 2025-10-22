export class EmailValidator {
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  static isValid(email: string): boolean {
    return this.EMAIL_REGEX.test(email);
  }

  static validate(email: string): void {
    if (!email || email.trim() === '') {
      throw new Error('Email is required');
    }
    
    if (!this.isValid(email)) {
      throw new Error('Invalid email format');
    }
  }
}