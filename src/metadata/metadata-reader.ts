import metadataKeys from '../constants/metadata-keys';
import ParameterMetadata from './parameter-metadata';

export function getDependencyIDs(concreteType: Newable) {
    if (Reflect.hasOwnMetadata(metadataKeys.PARAMMETADATA, concreteType)) {
        const parameterMetadataList = Reflect.getMetadata(metadataKeys.PARAMMETADATA, concreteType);
        return parameterMetadataList.map((parameterMetadata: ParameterMetadata) => {
            return parameterMetadata.typeID;
        });
    }

    return [];
}
