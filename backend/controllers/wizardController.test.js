import { getWizards, createWizard } from './wizardController'; // Adjust path as necessary
import { wizardService } from '../services/wizardService'; // Adjust path as necessary
import httpMocks from 'node-mocks-http';

jest.mock('../services/wizardService');

describe('Wizard Controller', () => {
    it('getWizards returns wizards and responds 200', async () => {
        const wizards = [{ name: 'Merlin', age: 300, imagePath: 'backend\\uploads\\1704369644544.jpeg' }];
        wizardService.getWizards.mockResolvedValue(wizards);
        
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        
        await getWizards(req, res);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual(wizards);
    });

    it('createWizard successfully creates a wizard and responds 201', async () => {
        const req = httpMocks.createRequest({
            file: {
                path: '/uploads/image.jpg'
            },
            body: {
                name: 'Merlin',
                age: 300
            }
        });
        const res = httpMocks.createResponse();
        wizardService.createWizard.mockResolvedValue({ id: 1, ...req.body, imagePath: req.file.path });

        await createWizard(req, res);
        expect(res.statusCode).toBe(201);
        expect(res._getJSONData()).toHaveProperty('message', 'Added Successfully');
    });
});

