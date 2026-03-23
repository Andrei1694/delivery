import { useCallback, type FormEvent } from 'react';

type SubmittableForm = {
  handleSubmit: () => Promise<unknown> | unknown;
};

const useFormSubmitHandler = (form: SubmittableForm) =>
  useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();
      void form.handleSubmit();
    },
    [form],
  );

export default useFormSubmitHandler;
