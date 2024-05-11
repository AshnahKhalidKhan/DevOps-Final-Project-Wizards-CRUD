import mongoose from "mongoose";
import { Wizard } from "./wizard"; // adjust the path to where your model is actually defined

describe('Wizard Model Test', () => {
    beforeAll(async () => {
        const url = 'mongodb://127.0.0.1/wizardTest';
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    test('create & save wizard successfully', async () => {
        const validWizard = new Wizard({ name: 'Gandalf', age: 2019, imagePath: 'path/to/image.jpg' });
        const savedWizard = await validWizard.save();

        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedWizard._id).toBeDefined();
        expect(savedWizard.name).toBe('Gandalf');
        expect(savedWizard.age).toBe(2019);
        expect(savedWizard.imagePath).toBe('path/to/image.jpg');
    });

    test('insert wizard successfully, but the field does not defined in schema should be undefined', async () => {
        const wizardWithInvalidField = new Wizard({ name: 'Gandalf', age: 2019, imagePath: 'path/to/image.jpg', power: 500 });
        const savedWizardWithInvalidField = await wizardWithInvalidField.save();
        expect(savedWizardWithInvalidField._id).toBeDefined();
        expect(savedWizardWithInvalidField.power).toBeUndefined();
    });

    test('create wizard without required field should failed', async () => {
        const wizardWithoutRequiredField = new Wizard({ name: 'Gandalf' });
        let err;
        try {
            const savedWizardWithoutRequiredField = await wizardWithoutRequiredField.save();
            error = savedWizardWithoutRequiredField;
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.age).toBeDefined();
        expect(err.errors.imagePath).toBeDefined();
    });
});
