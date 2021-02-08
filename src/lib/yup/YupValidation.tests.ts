import YupValidation from './YupValidation';
import { array, object, string, number } from 'yup';

const schema = array().of(
  object().shape({
    field1: string().required('field1 is required'),
    field2: number().required('field2 is required')
  })
);

const validator = new YupValidation(schema);

const validData = [
  {
    field1: '123',
    field2: 123
  }
];

const invalidData = [
  {},
  {
    field1: 'Some value',
    field2: 10
  },
  {}
];

describe('YupValidation', () => {
  describe('isValid', () => {
    test('Returns true when schema is valid', async () => {
      await validator.validate(validData);

      expect(validator.isValid()).toBe(true);
    });

    test('Returns false when schema is invalid', async () => {
      try {
        await validator.validate(invalidData);
      } catch (err) {
        expect(validator.isValid()).toBe(false);
      }
    });
  });

  describe('getError', () => {
    test('Gets specific validation error based on field', async () => {
      try {
        await validator.validate(invalidData);
      } catch (err) {
        expect(validator.getError('[0].field1')).toBe('field1 is required');
        expect(validator.getError('[0].field2')).toBe('field2 is required');
      }
    });
  });

  describe('getAllErrors', () => {
    test('Gets all validation errors', async () => {
      try {
        await validator.validate(invalidData);
      } catch (err) {
        expect(validator.getAllErrors()).toEqual({
          '[0].field1': ['field1 is required'],
          '[0].field2': ['field2 is required'],
          '[2].field1': ['field1 is required'],
          '[2].field2': ['field2 is required']
        });
      }
    });
  });

  test('throws validation error on validate', async () => {
    try {
      await validator.validate(invalidData);
    } catch (err) {
      expect(err).toEqual({
        '[0].field1': ['field1 is required'],
        '[0].field2': ['field2 is required'],
        '[2].field1': ['field1 is required'],
        '[2].field2': ['field2 is required']
      });
    }
  });
});
