import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaErrorExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status = 500; // You can adjust this based on the error type

    // Handle the error and return an appropriate response
    response.status(status).json({
      message: 'An error occurred while querying the database.',
      code: exception.code,
      // ... other error details you want to include
    });
  }
}
