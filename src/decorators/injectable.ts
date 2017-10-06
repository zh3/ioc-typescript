import metadataKeys from '../constants/metadata-keys';
import { DuplicateInjectableError } from '../error';

export function injectable(target: Newable) {
    if (Reflect.hasOwnMetadata(metadataKeys.PARAMTYPES, target)) {
        throw new DuplicateInjectableError();
    }

    const types = Reflect.getMetadata(metadataKeys.DESIGN_PARAMTYPES, target) || [];
    Reflect.defineMetadata(metadataKeys.PARAMTYPES, types, target);

    return target;
}
