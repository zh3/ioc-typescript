import compilerSerializedTypeIDs from '../constants/compiler-serialized-type-ids';

interface ICompilerSerializedType {
    name?: string;
}

const primitiveTypeSerializedNames = new Set([
    'Number',
    'String',
    'Boolean',
    'Array',
]);

const serializedNameToTypeConstant = new Map<string, string>()
    .set('Number', compilerSerializedTypeIDs.NUMBER) // Could also be enum
    .set('String', compilerSerializedTypeIDs.STRING)
    .set('Boolean', compilerSerializedTypeIDs.BOOLEAN)
    .set('Array', compilerSerializedTypeIDs.ARRAY) // Could also be tuple
    .set('Object', compilerSerializedTypeIDs.ANY)
    .set(undefined, compilerSerializedTypeIDs.VOID)
    .set('Function', compilerSerializedTypeIDs.FUNCTION);

export function isPrimitive(compilerParamType: ICompilerSerializedType) {
    return primitiveTypeSerializedNames.has(compilerParamType.name);
}

export function getTypeConstant(compilerParamType: ICompilerSerializedType) {
    if (typeof compilerParamType.name === 'undefined') {
        return compilerSerializedTypeIDs.VOID;
    }

    if (serializedNameToTypeConstant.has(compilerParamType.name)) {
        return serializedNameToTypeConstant.get(compilerParamType.name);
    }

    return compilerSerializedTypeIDs.CLASS;
}

export default ICompilerSerializedType;
