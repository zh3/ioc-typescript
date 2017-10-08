import metadataKeys from '../constants/metadata-keys';
import parameterMetadataKeys from '../constants/parameter-metadata-keys';

export function getDependencyIDs(concreteType: Newable): TypeID[] {
    if (Reflect.hasOwnMetadata(metadataKeys.PARAMMETADATA, concreteType)) {
        const parameterMetadataList = Reflect.getMetadata(metadataKeys.PARAMMETADATA, concreteType);
        return parameterMetadataList.map((parameterMetadata: any) => {
            return parameterMetadata.typeID;
        });
    }

    return [];
}
