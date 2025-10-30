
export const sendResponse = (
  res,
  statusCode,
  success,
  message,
  data = null,
  meta = null
) => {
  const response = {
    success,
    message,
    data,
  };

  if (meta) response.meta = meta;

  return res.status(statusCode).json(response);
};


export const successResponse = (
  res,
  message,
  data = null,
  meta = null,
  code = 200
) => {
  return sendResponse(res, code, true, message, data, meta);
};

export const errorResponse = (res, message, code = 400, data = null) => {
  return sendResponse(res, code, false, message, data);
};
