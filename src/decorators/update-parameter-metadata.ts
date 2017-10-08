import metadataKeys from '../constants/metadata-keys';
import { InjectAppliedToPropertyError } from '../error';

export default function updateParameterMetadata(
    metadataKey: string,
    metadataValue: any,
    target: any,
    index: number,
) {
    if (typeof index !== 'number') {
        throw new InjectAppliedToPropertyError();
    }

    const hasParameterMetadataList = Reflect.hasOwnMetadata(metadataKeys.PARAMMETADATA, target);
    const parameterMetadataList = hasParameterMetadataList
        ? Reflect.getMetadata(metadataKeys.PARAMMETADATA, target)
        : [];

    const parameterMetadata = parameterMetadataList[index] || {};
    parameterMetadata[metadataKey] = metadataValue;
    parameterMetadataList[index] = parameterMetadata;

    Reflect.defineMetadata(
        metadataKeys.PARAMMETADATA,
        parameterMetadataList,
        target,
    );
}
