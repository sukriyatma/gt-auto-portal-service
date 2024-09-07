import { Global, Module } from '@nestjs/common';
import { firebaseConfig } from 'src/common/config/firebase-config';

@Global()
@Module({
    providers: [
        {
            provide: "FIREBASE",
            useValue: firebaseConfig
        }
    ],
    exports: ["FIREBASE"]
})
export class FirebaseModule {}
