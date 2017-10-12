import metadataKeys from '../constants/metadata-keys';
import { NotSupportedError } from '../error/';
import {
    DirectCircularDependencyError,
    InjectableRequiredError,
    InjectRequiredError,
    PrimitiveNameRequiredError,
} from '../error/';
import ICompilerSerializedType from './compiler-serialized-types';
import { isPrimitive } from './compiler-serialized-types';
import IParameterMetadata from './parameter-metadata';

import {
    getCompilerParamTypes,
    getUserDefinedParameterMetadataList,
} from './metadata-reader';

function validatePrimitive(userDefinedParameterMetadata: IParameterMetadata, typeName: string, index: number) {
    // throw new NotSupportedError('Primitives are not yet supported');
    if (!userDefinedParameterMetadata) {
        throw new PrimitiveNameRequiredError(typeName, index);
    }
}

function validateClass(userDefinedParameterMetadata: IParameterMetadata, typeName: string, index: number) {
    if (!userDefinedParameterMetadata || !userDefinedParameterMetadata.typeID) {
        throw new InjectRequiredError(typeName, index);
    }
}

export function validateParameterMetadata(concreteType: Newable) {
    const userDefinedParameterMetadataList: IParameterMetadata[] = getUserDefinedParameterMetadataList(concreteType);
    const compilerParamTypes: ICompilerSerializedType[] = getCompilerParamTypes(concreteType);
    if (typeof compilerParamTypes === 'undefined') {
        throw new InjectableRequiredError(concreteType.name);
    }

    compilerParamTypes.forEach((compilerSerializedParamType: ICompilerSerializedType, i: number) => {
        const userDefinedParameterMetadata: IParameterMetadata = userDefinedParameterMetadataList[i];

        if (!compilerSerializedParamType) {
            // import time circular dependency on concrete class TS has not yet been able to generate type
            // info for
            throw new DirectCircularDependencyError(concreteType.name, i);
        }

        if (isPrimitive(compilerSerializedParamType)) {
            validatePrimitive(userDefinedParameterMetadata, concreteType.name, i);
        } else if (!userDefinedParameterMetadata || !userDefinedParameterMetadata.typeID) {
            throw new InjectRequiredError(concreteType.name, i);
        }
    });
}
