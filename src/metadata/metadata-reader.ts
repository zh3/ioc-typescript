import metadataKeys from '../constants/metadata-keys';
import IParameterMetadata from './parameter-metadata';

export function getParameterMetadataList(concreteType: Newable): IParameterMetadata[] {
    if (Reflect.hasOwnMetadata(metadataKeys.PARAMMETADATA, concreteType)) {
        const parameterMetadataList = Reflect.getMetadata(metadataKeys.PARAMMETADATA, concreteType);
        return parameterMetadataList.map((parameterMetadata: any) => {
            return parameterMetadata;
        });
    }

    return [];
}
