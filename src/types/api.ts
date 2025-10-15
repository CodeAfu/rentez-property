type Success<T> = {
  success: boolean;
  data: T;
  message?: string;
};

type Failure<E> = {
  success: boolean;
  error: E;
  message?: string;
};

export type Result<T, E = Error> = Success<T> | Failure<E>;
