import {SampleService} from './sampleService';
import {inject, addProviders} from '@angular/core/testing';

describe('sampleService service', () => {
  beforeEach(() => {
    addProviders([Service]);
  });

  it('should...', inject([SampleService], (service: SampleService) => {
    expect(service.getData()).toBe(3);
  }));
});
