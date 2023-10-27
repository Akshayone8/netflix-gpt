export const checkValidData = (email, password) => {
  const isEmailValid =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    );

  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,10}$/.test(
      password
    );

  if (!isEmailValid) return "Email id is Not Valid";
  if (!isPasswordValid) return "Please check your Password";

  return null;
};
