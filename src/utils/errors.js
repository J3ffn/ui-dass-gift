export const extractErrorMessage = (error) => {
  if (error?.response) {
    return error.response.data?.message || "Erro inesperado";
  }
  return "Não foi possível conectar ao servidor. Verifique sua conexão.";
};

export const extractFieldErrors = (error) => {
  const details = error?.response?.data?.details;
  if (!Array.isArray(details)) return {};
  return Object.fromEntries(
    details.filter((item) => item.field).map((item) => [item.field, item.message]),
  );
};
