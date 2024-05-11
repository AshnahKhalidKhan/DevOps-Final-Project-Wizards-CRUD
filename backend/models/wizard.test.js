import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Wizard } from './wizard'; // Adjust path as necessary

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Wizard model', () => {
    it('should save a wizard', async () => {
        const wizardData = { name: 'Merlin', age: 300, imagePath: 'backend\\uploads\\1704369644544.jpeg' };
        const wizard = new Wizard(wizardData);
        const savedWizard = await wizard.save();

        expect(savedWizard._id).toBeDefined();
        expect(savedWizard.name).toBe(wizardData.name);
        expect(savedWizard.age).toBe(wizardData.age);
        expect(savedWizard.imagePath).toBe(wizardData.imagePath);
    });
});
