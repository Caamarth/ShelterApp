export interface AnimalModel {
    id: number;
    name: string;
    sex: number;
    race: string;
    raceType: number;
    birthDate: string;
    admissionDate: string;
    weight: number;
    width: number;
    height: number;
    length: number;
    description: string;
    classification: number;
    isdeleted: boolean;
    applications: any[];
}