import metadataKeys from '../constants/metadata-keys';
import { InjectAppliedToPropertyError } from '../error';
import ParameterMetadata from '../metadata/parameter-metadata';

export const inject = (typeId: TypeID) => (target: any, targetKey: string, index: number) => {
    if (typeof index !== 'number') {

        throw new InjectAppliedToPropertyError();
    }

    const hasParameterMetadataList = Reflect.hasOwnMetadata(metadataKeys.PARAMMETADATA, target);
    const parameterMetadataList = hasParameterMetadataList
        ? Reflect.getMetadata(metadataKeys.PARAMMETADATA, target)
        : [];

    parameterMetadataList[index] = new ParameterMetadata(typeId);
    Reflect.defineMetadata(
        metadataKeys.PARAMMETADATA,
        parameterMetadataList,
        target,
    );
};
