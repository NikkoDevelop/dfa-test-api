export interface CreateImageDTO {
    title: string;
    url: string;
    shortDescription?: string;
}

export interface UpdateImageDTO {
    imageId: number;
    url?: string;
    title?: string;
    shortDescription?: string;
}

export interface DeleteImageDTO {
    imageId: number;
}

export interface GetImageDTO {
    imageId: number;
}

export interface GetGaleryDTO {
    userId: number;
}
