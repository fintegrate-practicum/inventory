import { Provider } from './Provider';
import { validateSync } from 'class-validator';

describe('Provider', () => {
    it('should create a valid provider', () => {
        const validProvider = new Provider();
        validProvider.providerName = 'Aweso Provider';
        validProvider.providerEmail = 'valid@email.com';
        validProvider.providerPhone = '123456789';
        validProvider.webSiteUrl = 'https://www.awesomeprovider.com';
        validProvider.supplyCategory = 'Electronics';
        validProvider.businessId = 'businessXYZ';

        const errors = validateSync(validProvider);
        expect(errors.length).toBe(0);
    });

    it('should not create a provider with missing providerName', () => {
        const missingNameProvider = new Provider();
        missingNameProvider.providerName = '';
        missingNameProvider.providerEmail = 'valid@email.com';
        missingNameProvider.providerPhone = '123456789';
        missingNameProvider.webSiteUrl = 'https://www.awesomeprovider.com';
        missingNameProvider.supplyCategory = 'Electronics';
        missingNameProvider.businessId = 'businessXYZ';

        const errors = validateSync(missingNameProvider);
        console.log(errors);
        expect(errors.length).toBeGreaterThan(0);
    });

      it('should not create a provider with providerName less than 3 characters', () => {
        const invalidNameProvider = new Provider();
        invalidNameProvider.providerName = 'A';
        invalidNameProvider.providerEmail = 'valid@email.com';
        invalidNameProvider.providerPhone = '123456789';
        invalidNameProvider.webSiteUrl = 'https://www.awesomeprovider.com';
        invalidNameProvider.supplyCategory = 'Electronics';
        invalidNameProvider.businessId = 'businessXYZ';

        const errors = validateSync(invalidNameProvider);
        console.log(errors);
        expect(errors.length).toBeGreaterThan(0);
      });

    it('should not create a provider with invalid email format', () => {
        const invalidEmailProvider = new Provider();
        invalidEmailProvider.providerName = 'Awesome Provider';
        invalidEmailProvider.providerEmail = 'invalidEmail';
        invalidEmailProvider.providerPhone = '123456789';
        invalidEmailProvider.webSiteUrl = 'https://www.awesomeprovider.com';
        invalidEmailProvider.supplyCategory = 'Electronics';
        invalidEmailProvider.businessId = 'businessXYZ';

        const errors = validateSync(invalidEmailProvider);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors.some(error => error.property === 'providerEmail' && error.constraints.isEmail)).toBeTruthy();
    });

      it('should not create a provider with phone number less than 7 digits', () => {
        const invalidPhoneProvider = new Provider();
        invalidPhoneProvider.providerName = 'Awesome Provider';
        invalidPhoneProvider.providerEmail = 'valid@email.com';
        invalidPhoneProvider.providerPhone = '123456';
        invalidPhoneProvider.webSiteUrl = 'https://www.awesomeprovider.com';
        invalidPhoneProvider.supplyCategory = 'Electronics';
        invalidPhoneProvider.businessId = 'businessXYZ';

        const errors = validateSync(invalidPhoneProvider);
        console.log(errors);
        expect(errors.length).toBeGreaterThan(0);
      });
})