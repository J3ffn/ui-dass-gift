export const SHIRT_SIZES = ["PP", "P", "M", "G", "GG", "XG"];
export const SHOE_SIZE_MIN = 34;
export const SHOE_SIZE_MAX = 48;

export const SHIRT_SIZE_OPTIONS = SHIRT_SIZES.map((size) => ({
  value: size,
  label: size,
}));

export const SHOE_SIZE_OPTIONS = Array.from(
  { length: SHOE_SIZE_MAX - SHOE_SIZE_MIN + 1 },
  (_, i) => ({
    value: SHOE_SIZE_MIN + i,
    label: (SHOE_SIZE_MIN + i).toString(),
  }),
);

const onlyDigits = (value) => String(value ?? "").replace(/\D/g, "");

const calculateDigit = (digits, weightStart) => {
  let sum = 0;
  for (let i = 0; i < digits.length; i += 1) {
    sum += Number(digits[i]) * (weightStart - i);
  }
  const remainder = (sum * 10) % 11;
  return remainder === 10 ? 0 : remainder;
};

export const isValidCpf = (rawValue) => {
  const cpf = onlyDigits(rawValue);

  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  const firstDigit = calculateDigit(cpf.slice(0, 9), 10);
  if (firstDigit !== Number(cpf[9])) return false;

  const secondDigit = calculateDigit(cpf.slice(0, 10), 11);
  return secondDigit === Number(cpf[10]);
};

export const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value ?? ""));

export const isValidShoeSize = (value) => {
  const size = Number(value);
  return Number.isInteger(size) && size >= SHOE_SIZE_MIN && size <= SHOE_SIZE_MAX;
};

export const isValidShirtSize = (value) => SHIRT_SIZES.includes(value);

export const formatCpf = (rawValue) => {
  const cpf = onlyDigits(rawValue).slice(0, 11);
  return cpf
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

export const validateEmployeeForm = ({ name, cpf, email, shirtSize, shoeSize }) => {
  const errors = {};

  if (!name || name.trim().length < 2) {
    errors.name = "Informe ao menos 2 caracteres";
  }
  if (!isValidCpf(cpf)) {
    errors.cpf = "CPF inválido";
  }
  if (!isValidEmail(email)) {
    errors.email = "E-mail inválido";
  }
  if (!isValidShirtSize(shirtSize)) {
    errors.shirtSize = "Selecione um tamanho de camiseta";
  }
  if (!isValidShoeSize(shoeSize)) {
    errors.shoeSize = `Informe um número entre ${SHOE_SIZE_MIN} e ${SHOE_SIZE_MAX}`;
  }

  return errors;
};
