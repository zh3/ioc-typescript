import metadataKeys from '../constants/metadata-keys';
import ICompilerSerializedType from './compiler-serialized-types';
import IParameterMetadata from './parameter-metadata';

export function getParameterMetadataList(concreteType: Newable): IParameterMetadata[] {
    const userDefinedParameterMetadataList: IParameterMetadata[] = getUserDefinedParameterMetadataList(
        concreteType,
    );
    const compilerParamTypes: ICompilerSerializedType[] = getCompilerParamTypes(concreteType);

    return compilerParamTypes.map((compilerParamType: ICompilerSerializedType, i: number) => {
        const userDefinedParameterMetadata: IParameterMetadata = userDefinedParameterMetadataList[i];

        return {
            compilerParamType,
            ...userDefinedParameterMetadata,
        };
    });
}

export function getUserDefinedParameterMetadataList(concreteType: Newable): IParameterMetadata[] {
    if (Reflect.hasOwnMetadata(metadataKeys.PARAMMETADATA, concreteType)) {
        const parameterMetadataList = Reflect.getMetadata(metadataKeys.PARAMMETADATA, concreteType);
        return parameterMetadataList.map((parameterMetadata: any) => {
            return parameterMetadata;
        });
    }

    return [];
}

export function getCompilerParamTypes(concreteType: Newable): ICompilerSerializedType[] {
    return Reflect.getMetadata(metadataKeys.PARAMTYPES, concreteType);
}
