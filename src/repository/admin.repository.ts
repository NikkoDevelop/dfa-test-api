import prisma from '../prisma-client';

class AdminRepository {
  public async deleteImages () {
    await prisma.image.deleteMany();

    return 'Deleted successfully';
  }
}

export default AdminRepository;
