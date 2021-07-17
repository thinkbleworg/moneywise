export const emailValidator = (email) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return "Email cannot be empty.";
  if (!re.test(email)) return "Ooops! We need a valid email address.";

  return "";
};

export const passwordValidator = (password) => {
  if (!password || password.length <= 0) return "Password cannot be empty.";

  return "";
};

export const nameValidator = (name) => {
  if (!name || name.length <= 0) return "Name cannot be empty.";

  return "";
};

export const authCodeValidator = (authCode) => {
  if (!authCode || authCode.length <= 0) return "AuthCode cannot be empty.";
  return "";
};

export const validate = (fields) => {
  var validateError = "",
    fieldName = "",
    isValid = true;
  Object.keys(fields).forEach((key) => {
    if (!isValid) {
      return;
    }
    if (key === "email") {
      validateError = emailValidator(fields[key]);
    } else if (key === "password") {
      validateError = passwordValidator(fields[key]);
    } else if (key === "firstName" || key === "lastName" || key === "name") {
      validateError = nameValidator(fields[key]);
    } else if (key === "code") {
      validateError = authCodeValidator(fields[key]);
    }
    fieldName = key;
    isValid = validateError === "";
    return;
  });
  return {
    fieldName,
    validateError,
  };
};
