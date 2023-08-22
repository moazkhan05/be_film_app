import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  
  await prisma.film.deleteMany({})
  console.log('...deleting previous movies');

  await prisma.film.createMany({
    data: [
        {
            name: 'Inception',
            description: 'A mind-bending movie about dreams and reality.',
            releaseDate: new Date('2010-07-16T00:00:00Z'),
            ticketPrice: 10.99,
            country: 'USA',
            genre: 'Science Fiction',
            photo: 'inception.jpg',
          },
          {
            name: 'The Shawshank Redemption',
            description: 'The story of hope, friendship, and redemption.',
            releaseDate: new Date('1994-09-23T00:00:00Z'),
            ticketPrice: 8.99,
            country: 'USA',
            genre: 'Drama',
            photo: 'shawshank_redemption.jpg',
          },
          {
            name: 'Avatar',
            description: 'A tale of a paraplegic marine dispatched to the moon Pandora.',
            releaseDate: new Date('2009-12-18T00:00:00Z'),
            ticketPrice: 9.99,
            country: 'USA',
            genre: 'Science Fiction',
            photo: 'avatar.jpg',
          },
          {
            name: 'The Lord of the Rings: The Fellowship of the Ring',
            description: 'An epic fantasy adventure based on J.R.R. Tolkien\'s novel.',
            releaseDate: new Date('2001-12-19T00:00:00Z'),
            ticketPrice: 7.99,
            country: 'USA',
            genre: 'Fantasy',
            photo: 'lotr_fellowship.jpg',
          },
          {
            name: 'Pulp Fiction',
            description: 'A non-linear crime film featuring interconnected stories.',
            releaseDate: new Date('1994-10-14T00:00:00Z'),
            ticketPrice: 7.49,
            country: 'USA',
            genre: 'Crime',
            photo: 'pulp_fiction.jpg',
          }
    ],
  });

  console.log('...adding movies');
}

seed()
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    prisma.$disconnect();
  });
