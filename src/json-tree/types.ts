import { compose } from '@ngrx/core/compose';


export const KNOWN = {
  Array: 'array',
  Object: 'object',
  Null: 'null',
  Undefined: 'undefined',
  Boolean: 'boolean',
  Number: 'number',
  String: 'string',
  Symbol: 'symbol',
  Function: 'function',
  Iterable: 'iterable'
};

export function getTypeOf(object: any) {
  const literalType = typeof object;

  if (literalType === 'object') {
    if (Array.isArray(object)) {
      return KNOWN.Array;
    }
    if (object === null) {
      return KNOWN.Null;
    }
    if (typeof object[Symbol.iterator] === 'function') {
      return KNOWN.Iterable;
    }
  }

  return literalType;
}

const arrayLength = (value: any[]) => value.length;
const lengthLabel = (single: string, plural: string) => (length: number) => `${length} ${length === 1 ? single : plural }`;
const typeIndicator = (typeIndicator: string) => (input: string) => `${typeIndicator} ${input}`;
const typeIdentity = (type: string) => () => type;
const withQuotes = (val: string) => `"${val}"`;
const toString = (val: Object) => val.toString();
const iterableToArray = (value: Iterable<any>) => Array.from(value);

const labelFactoriesForTypes = {
  [KNOWN.Array]: compose(typeIndicator('[]'), lengthLabel('item', 'items'), arrayLength),
  [KNOWN.Object]: compose(typeIndicator('{}'), lengthLabel('key', 'keys'), arrayLength, Object.getOwnPropertyNames),
  [KNOWN.Null]: typeIdentity(KNOWN.Null),
  [KNOWN.Undefined]: typeIdentity(KNOWN.Undefined),
  [KNOWN.Boolean]: (val: boolean) => val ? 'true' : 'false',
  [KNOWN.Number]: toString,
  [KNOWN.String]: withQuotes,
  [KNOWN.Symbol]: compose(withQuotes, toString),
  [KNOWN.Function]: typeIdentity(KNOWN.Function),
  [KNOWN.Iterable]: compose(typeIndicator('()'), lengthLabel('entry', 'entries'), arrayLength, iterableToArray)
};

const lookupLabelForType = (type: string) => labelFactoriesForTypes[type];

export const getLabelFor = (object: any) => labelFactoriesForTypes[getTypeOf(object)](object);

export function getChildrenFor(object: any): any[] {
  const literalType = getTypeOf(object);

  if (literalType === KNOWN.Object) {
    return Object.getOwnPropertyNames(object).map(name => {
      return { key: name, value: object[name] };
    });
  }
  else if (literalType === KNOWN.Array) {
    return object.map((value, index) => {
      return { key: index, value };
    });
  }
  else if (literalType === KNOWN.Iterable) {
    return Array.from(object).map((value, index) => {
      return { key: index, value };
    });
  }

  throw new TypeError(`Tried to get children for non-enumerable type "${literalType}"`);
}
