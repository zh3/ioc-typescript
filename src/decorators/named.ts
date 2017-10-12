import parameterMetadataKeys from '../constants/parameter-metadata-keys';
import updateParameterMetadata from '../metadata/update-parameter-metadata';

export const named = (name: TypeID) => (target: any, targetKey: string, index: number) => {
    updateParameterMetadata(
        parameterMetadataKeys.NAME,
        name,
        target,
        index,
    );
};
