import { Module } from "@nestjs/common";
import { UsersModule } from './users/users.module';

import { db } from './db';
import { env } from './env';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [env, db, UsersModule, AuthModule]
})
export class AppModule {

}