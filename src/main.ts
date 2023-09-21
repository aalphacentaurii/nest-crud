import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function main() {
    const PORT = process.env.PORT || 3001;
    const app = await NestFactory.create(AppModule);

    const config =  new DocumentBuilder()
        .setTitle('CRUD & JWT Authorization')
        .setDescription("NestJS, Sequelize, Swagger")
        .setVersion('1.0.0')
        .build()
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    await app.listen(PORT, ()=>{ console.log('Started Nest-server on port: '+PORT) });
}

main();