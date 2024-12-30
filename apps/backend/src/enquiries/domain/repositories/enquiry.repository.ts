import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Enquiry } from '../entities/enquiry.entity';
import { CreateEnquiryDto, UpdateEnquiryDto } from 'src/enquiries/interfaces';

@Injectable()
export class EnquiryRepository {
  constructor(
    @InjectRepository(Enquiry)
    private readonly repository: Repository<Enquiry>
  ) {}

  async create(createEnquiryDto: CreateEnquiryDto): Promise<Enquiry> {
    const enquiry = this.repository.create(createEnquiryDto);
    return this.repository.save(enquiry);
  }

  async findAll(): Promise<Enquiry[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<Enquiry | null> {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: string, updateEnquiryDto: UpdateEnquiryDto): Promise<Enquiry> {
    await this.repository.update(id, updateEnquiryDto);
    return this.repository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
