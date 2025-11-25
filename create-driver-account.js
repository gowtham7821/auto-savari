// One-time script to create driver account and initialize Firestore data
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDKhPJlhWdJvlcZKDqOqnAWJOBwXWyNvJk",
    authDomain: "pincode-picker.firebaseapp.com",
    projectId: "pincode-picker",
    storageBucket: "pincode-picker.firebasestorage.app",
    messagingSenderId: "1050560777116",
    appId: "1:1050560777116:web:f3e0e7e6e5f3e0e7e5f3e0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function setupDriver() {
    try {
        console.log('Creating driver account...');

        // Create driver account
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            'gowthamv7821@gmail.com',
            'Gowtham@1233'
        );

        console.log('✅ Driver account created:', userCredential.user.email);

        // Initialize driver data in Firestore
        await setDoc(doc(db, 'drivers', 'adminDriver'), {
            name: 'VELU P',
            autoNumber: 'TN16K7393',
            phone: '9787714603',
            status: 'available',
            lastUpdated: new Date()
        });

        console.log('✅ Driver data initialized in Firestore');
        console.log('\n🎉 Setup complete! You can now login with:');
        console.log('Email: gowthamv7821@gmail.com');
        console.log('Password: Gowtham@1233');

        process.exit(0);
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            console.log('⚠️  Account already exists. Updating Firestore data only...');

            // Just update Firestore data
            await setDoc(doc(db, 'drivers', 'adminDriver'), {
                name: 'VELU P',
                autoNumber: 'TN16K7393',
                phone: '9787714603',
                status: 'available',
                lastUpdated: new Date()
            });

            console.log('✅ Driver data updated in Firestore');
            process.exit(0);
        } else {
            console.error('❌ Error:', error.message);
            process.exit(1);
        }
    }
}

setupDriver();
