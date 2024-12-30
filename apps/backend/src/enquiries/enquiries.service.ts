import { Injectable, NotFoundException } from '@nestjs/common';
import { EnquiryRepository } from './domain';
import { CreateEnquiryDto, UpdateEnquiryDto } from './interfaces';

@Injectable()
export class EnquiriesService {
  constructor(private readonly enquiryRepository: EnquiryRepository) {}

  async create(createEnquiryDto: CreateEnquiryDto) {
    return this.enquiryRepository.create(createEnquiryDto);
  }

  async findAll() {
    return this.enquiryRepository.findAll();
  }

  async findOne(id: string) {
    const enquiry = await this.enquiryRepository.findOne(id);
    if (!enquiry) {
      throw new NotFoundException(`Enquiry with ID ${id} not found`);
    }
    return enquiry;
  }

  async update(id: string, updateEnquiryDto: UpdateEnquiryDto) {
    const updatedEnquiry = await this.enquiryRepository.update(id, updateEnquiryDto);
    if (!updatedEnquiry) {
      throw new NotFoundException(`Enquiry with ID ${id} not found`);
    }
    return updatedEnquiry;
  }

  async remove(id: string) {
    const enquiry = await this.findOne(id);
    await this.enquiryRepository.remove(enquiry.id);
  }
}
