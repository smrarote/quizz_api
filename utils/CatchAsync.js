export default function catchAsync(func) {
  return async function (req, res, next) {
    try {
      await func(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}
