type Success<T> = {
  status: number;
  data: T;
  error: null;
  message?: string;
};

type Failure<E> = {
  status: number;
  data: null;
  error: E;
  message?: string;
};

export type Result<T, E = Error> = Success<T> | Failure<E>;
