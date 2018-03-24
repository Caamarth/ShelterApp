export interface ApplicationModel {
    id: number;
    publishDate: any;
    applyStatus: any;
    description: string;
    userEntityId: number;
    userEntity: any;
    animalEntityId: number;
    animalEntity: any;
    isDeleted: boolean;
    studies: any[];
    ratings: any[];
}

export interface ApplicationCreateModel {
    animalId: number;
    userId: number;
    description: string;
}