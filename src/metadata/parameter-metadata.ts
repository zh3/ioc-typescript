import ICompilerSerializedType from './compiler-serialized-types';

interface IParameterMetadata {
    typeID: TypeID;
    name?: string;
    compilerSerializedType: ICompilerSerializedType;
}

export default IParameterMetadata;
