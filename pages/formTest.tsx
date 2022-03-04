import {
  useForm,
  SubmitHandler,
  SubmitErrorHandler,
  useWatch,
} from 'react-hook-form';

type FormInput = {
  lastName: string;
  firstName: string;
  name: string;
};

const formTest = () => {
  const fa = 'bbbbbbbb';
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors, isDirty, isSubmitting, touchedFields, submitCount },
  } = useForm<FormInput>({
    defaultValues: {
      name: 'aaaa',
      lastName: fa,
    },
  });

  // const watchFiel = watch('lastName', fa);
  // console.log(watchFiel);

  const Watch02 = () => {
    return <p>{watch('lastName', fa)}</p>;
  };

  // バリデーションが成功した場合に実行。dataには、バリデーションが成功したフィールド情報が含まれている。
  const success: SubmitHandler<FormInput> = (data) => console.log(data);

  // バリデーションが失敗した場合に実行。errosには、バリデーションが失敗したフィールド情報が含まれている。
  const error: SubmitErrorHandler<FormInput> = (erros) => console.log(erros);

  const Watch = ({ control }) => {
    const name = useWatch({ control, name: 'name' });

    return <div>{name}</div>;
  };
  return (
    <>
      <form onSubmit={handleSubmit(success, error)}>
        <label>
          姓
          <input
            {...register('lastName', {
              required: { value: true, message: '名の入力は必須です' },
            })}
          />
        </label>
        <Watch02></Watch02>
        {errors.lastName && <p className="error">{errors.lastName.message}</p>}
        <label>
          名
          <input
            {...register('firstName', {
              required: { value: true, message: '名の入力は必須です' },
            })}
          />
        </label>
        {errors.firstName && (
          <p className="error">{errors.firstName.message}</p>
        )}
        <label>
          名
          <input {...register('name')} />
        </label>
        <Watch control={control} />
        {isDirty && <p>Form is dirty.</p>}
        {isSubmitting && <span>Submitting...</span>}
        <button>送信する</button>
      </form>
    </>
  );
};

export default formTest;
