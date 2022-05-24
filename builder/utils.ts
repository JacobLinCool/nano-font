export function T(template: string, map: Record<string, unknown>): string {
    return new Function(...Object.keys(map), "return `" + template + "`;")(...Object.values(map));
}
