import { ConfigModule } from "@nestjs/config";

export const env = ConfigModule.forRoot({
    envFilePath: '.env'
})