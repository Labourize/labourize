import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { EnquiriesService } from './enquiries.service';
import { CreateEnquiryDto, UpdateEnquiryDto } from './interfaces';

@ApiTags('Enquiries')
@Controller('enquiries')
export class EnquiriesController {
  constructor(private readonly enquiriesService: EnquiriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new enquiry' })
  create(@Body() createEnquiryDto: CreateEnquiryDto) {
    return this.enquiriesService.create(createEnquiryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all enquiries' })
  findAll() {
    return this.enquiriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single enquiry by ID' })
  findOne(@Param('id') id: string) {    
    return this.enquiriesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an enquiry by ID' })
  update(@Param('id') id: string, @Body() updateEnquiryDto: UpdateEnquiryDto) {
    return this.enquiriesService.update(id, updateEnquiryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an enquiry by ID' })
  remove(@Param('id') id: string) {
    //Blocked
    // return this.enquiriesService.remove(id);
  }
}
