import prisma from '../prisma-client';

class ImageRepository {
  public async createImage (userId: number, title: string, url: string, shortDescription?: string) {
    const currentUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        galery: true,
      },
    });

    if (!currentUser) {
      return 'User with privided id does not exist';
    }

    if (!currentUser.galery) {
      const newGalery = await prisma.galery.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      return prisma.image.create({
        data: {
          title,
          url,
          shortDescription,
          galery: {
            connect: {
              id: newGalery.id,
            },
          },
        },
      });
    }

    return prisma.image.create({
      data: {
        title,
        url,
        shortDescription,
        galery: {
          connect: {
            id: currentUser.galery.id,
          },
        },
      },
    });
  }

  public async updateImage (userId: number, title?: string, url?: string, shortDescription?: string) {
    const currentUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        galery: true,
      },
    });

    const updatingImage = await prisma.image.findUnique({
      where: {
        url,
      },
    });

    if (!currentUser) {
      return 'User with privided id does not exist';
    }

    return prisma.image.update({
      where: {
        id: updatingImage.id,
      },
      data: {
        title: title || updatingImage.title,
        url: url || updatingImage.url,
        shortDescription: shortDescription || updatingImage.shortDescription,
      },
    });
  }

  public async deleteImage (imageId: number) {
    const existingImage = await prisma.image.findUnique({
      where: {
        id: imageId,
      },
    });

    if (!existingImage) {
      return 'Image with privided id does not exist';
    }

    await prisma.image.delete({
      where: {
        id: imageId,
      },
    });

    return 'Deleted successfully';
  }

  public async getImage (imageId: number) {
    const image = await prisma.image.findUnique({
      where: {
        id: imageId,
      },
    });

    if (!image) {
      return 'Image with privided id does not exist';
    }

    return image;
  }

  public async getGalery (userId: number) {
    const existingGalery = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        galery: {
          include: {
            images: true,
          },
        },
      },
    });

    if (!existingGalery) {
      return 'Galery with privided id does not exist';
    }

    return existingGalery;
  }
}

export default ImageRepository;
