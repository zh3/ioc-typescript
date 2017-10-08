import { IDependencyNode } from './dependency-node';

export default function findPath<T>(
    from: T,
    to: TypeID,
    dependenciesByType: Map<TypeID, IDependencyNode>,
): TypeID[] {
    return null;
}
