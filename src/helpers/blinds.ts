import { blindStructures } from "../data/blindStructures";

export function getBlinds(name: string = "shortstack-4hr/20min") {
    return blindStructures.filter((struct) => struct.name === name)[0].blinds;
}

export function getStructure(name: string) {
    return blindStructures.filter((struct) => struct.name === name)[0];
}

export function getBlindPresetNames() {
    return blindStructures.map((struct) => struct.name);
}