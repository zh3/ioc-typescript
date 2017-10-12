import parameterMetadataKeys from '../constants/parameter-metadata-keys';
import updateParameterMetadata from '../metadata/update-parameter-metadata';

export const inject = (typeId: TypeID) => (target: any, targetKey: string, index: number) => {
    updateParameterMetadata(
        parameterMetadataKeys.TYPE_ID,
        typeId,
        target,
        index,
    );
};
