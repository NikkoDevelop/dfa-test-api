export interface CreateImageDTO {
    title: string;
    url: string;
    shortDescription?: string;
}

export interface UpdateImageDTO {
    title?: string;
    url?: string;
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
