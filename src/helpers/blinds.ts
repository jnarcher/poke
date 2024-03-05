import { blindStructures } from "../data/blindStructures";

export function getBlindStructure(preset: string): BlindStructure {
    return blindStructures.filter((struct) => struct.preset === preset)[0];
}

export function getBlindPresetNames() {
    return blindStructures.map((struct) => struct.preset);
}