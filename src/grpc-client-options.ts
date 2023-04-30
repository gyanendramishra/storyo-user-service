import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { USER_PACKAGE_NAME } from './user/interface';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: USER_PACKAGE_NAME,
    url: '0.0.0.0:4003',
    protoPath: join(__dirname, './user/user.proto'),
  },
};
