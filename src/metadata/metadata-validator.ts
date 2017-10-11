import metadataKeys from '../constants/metadata-keys';
import { NotSupportedError } from '../error/';
import { DirectCircularDependencyError, InjectableRequiredError } from '../error/';
import ICompilerSerializedType from './compiler-serialized-types';
import { isPrimitive } from './compiler-serialized-types';
import IParameterMetadata from './parameter-metadata';

import {
    getCompilerParamTypes,
    getUserDefinedParameterMetadataList,
} from './metadata-reader';

function validatePrimitive(userDefinedParameterMetadata: IParameterMetadata) {
    throw new NotSupportedError('Primitives are not yet supported');
}

function validateClass(userDefinedParameterMetadata: IParameterMetadata, typeName: string, index: number) {
    if (!userDefinedParameterMetadata || !userDefinedParameterMetadata.typeID) {
        throw new InjectableRequiredError(typeName, index);
    }
}

export function validateParameterMetadata(concreteType: Newable) {
    const userDefinedParameterMetadataList: IParameterMetadata[] = getUserDefinedParameterMetadataList(concreteType);
    const compilerParamTypes: ICompilerSerializedType[] = getCompilerParamTypes(concreteType);
    compilerParamTypes.forEach((compilerSerializedParamType: ICompilerSerializedType, i: number) => {
        const userDefinedParameterMetadata: IParameterMetadata = userDefinedParameterMetadataList[i];

        if (!compilerSerializedParamType) {
            // import time circular dependency on concrete class TS has not yet been able to generate type
            // info for
            throw new DirectCircularDependencyError(concreteType.name, i);
        }
        if (compilerSerializedParamType && isPrimitive(compilerSerializedParamType)) {
            validatePrimitive(userDefinedParameterMetadata);
        }
        if (!userDefinedParameterMetadata || !userDefinedParameterMetadata.typeID) {
            throw new InjectableRequiredError(concreteType.name, i);
        }
    });
}
