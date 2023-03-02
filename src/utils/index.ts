export const validatePassword = (password: string): validationReturnType => {
  return {
    upper: (password.match(/[A-Z]/g) || []).length >= 1,
    lower: (password.match(/[a-z]/g) || []).length >= 1,
    digit: (password.match(/\d/g) || []).length >= 1,
    lengthCheck: password.length >= 8,
  };
};

  interface validationReturnType {
    upper: boolean;
    lower: boolean;
    digit: boolean;
    lengthCheck: boolean;
  }
